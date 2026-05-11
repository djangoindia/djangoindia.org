import {
  API_TIMEOUT_MESSAGE,
  API_UNAVAILABLE_MESSAGE,
  API_UNAVAILABLE_STATUS_CODE,
  buildApiUrl,
  getApiRequestTimeoutMs,
} from './apiUrl';

export type ErrorResponse = {
  message?: string;
  statusCode?: number;
};

export type FetchResponse<TData> =
  | {
      data: TData;
      error?: null;
      statusCode: number;
    }
  | {
      data: undefined;
      error: ErrorResponse;
      statusCode: number;
    };

const getMessageFromBody = (body: unknown) => {
  if (!body || typeof body !== 'object' || !('message' in body)) {
    return undefined;
  }

  const { message } = body as { message?: unknown };

  return typeof message === 'string' && message.trim() ? message : undefined;
};

const parseResponseBody = async (response: Response) => {
  const contentType = response.headers.get('content-type') ?? '';

  if (response.status === 204) {
    return undefined;
  }

  if (contentType.includes('application/json')) {
    return response.json().catch(() => undefined);
  }

  return response.text().catch(() => undefined);
};

const getFetchErrorMessage = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return API_TIMEOUT_MESSAGE;
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return API_TIMEOUT_MESSAGE;
  }

  return API_UNAVAILABLE_MESSAGE;
};

export const fetchData = async <TFetchedData>(
  path: string,
  options: RequestInit = { method: 'GET' },
  appendSlash = true,
): Promise<FetchResponse<TFetchedData>> => {
  const url = buildApiUrl(`${path}${appendSlash ? '/' : ''}`);

  if (!url) {
    return {
      data: undefined,
      error: {
        message: API_UNAVAILABLE_MESSAGE,
        statusCode: API_UNAVAILABLE_STATUS_CODE,
      },
      statusCode: API_UNAVAILABLE_STATUS_CODE,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    getApiRequestTimeoutMs(),
  );

  try {
    const { method, ...restOptions } = options;
    const response = await fetch(url, {
      method,
      ...restOptions,
      signal: restOptions.signal ?? controller.signal,
      headers: {
        ...restOptions.headers,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const parsedResponse = await parseResponseBody(response);

    if (!response.ok) {
      if (response.status === 429) {
        const newError = {
          message: 'Too many requests, Please try again after some time.',
          statusCode: response.status,
        };
        throw newError;
      }
      const newError = {
        message:
          getMessageFromBody(parsedResponse) ??
          response.status + ' : ' + response.statusText,
        statusCode: response?.status,
      };
      throw newError;
    }

    const responseBody = parsedResponse as TFetchedData;
    return { data: responseBody, error: null, statusCode: response.status };
  } catch (error: unknown) {
    const statusCode =
      (error as ErrorResponse).statusCode ?? API_UNAVAILABLE_STATUS_CODE;

    return {
      data: undefined,
      error: {
        message:
          (error as ErrorResponse).message ?? getFetchErrorMessage(error),
        statusCode,
      },
      statusCode,
    };
  } finally {
    clearTimeout(timeoutId);
  }
};
