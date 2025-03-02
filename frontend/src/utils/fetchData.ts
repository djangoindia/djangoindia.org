import { getApiUrl } from '../utils/apiUrl';
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

export const fetchData = async <TFetchedData>(
  path: string,
  options: RequestInit = { method: 'GET' },
  appendSlash = true,
): Promise<FetchResponse<TFetchedData>> => {
  try {
    const { method, ...restOptions } = options;
    const response = await fetch(
      `${getApiUrl()}${path}${appendSlash ? '/' : ''}`,
      {
        method,
        ...restOptions,
        headers: {
          ...restOptions.headers,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );

    const parsedResponse = await response.json();

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
          parsedResponse?.message !== ''
            ? parsedResponse?.message
            : response?.status + ' : ' + response.statusText,
        statusCode: response?.status,
      };
      throw newError;
    }

    const responseBody = parsedResponse as TFetchedData;
    return { data: responseBody, error: null, statusCode: response.status };
  } catch (error: unknown) {
    return {
      data: undefined,
      error: { message: (error as ErrorResponse).message },
      statusCode: (error as ErrorResponse).statusCode as number,
    };
  }
};
