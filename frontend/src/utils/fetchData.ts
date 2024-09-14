import { getApiUrl } from '../utils/apiUrl'
interface ErrorResponse {
  message?: string
  statusCode?: number
}

export type FetchResponse<TData> =
  | {
      data: TData
      error?: null
      statusCode: number
    }
  | {
      data?: null
      error: ErrorResponse
      statusCode: number
    }

export const fetchData = async <TFetchedData>(
  path: string,
  options: RequestInit = { method: 'GET' },
): Promise<FetchResponse<TFetchedData>> => {
  try {
    const { method, ...restOptions } = options
    const response = await fetch(`${getApiUrl()}${path}/`, {
      method,
      ...restOptions,
      headers: {
        ...restOptions.headers,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const parsedResponse = await response.json()

    if (!response.ok) {
      const newError = {
        message:
          parsedResponse?.message !== ''
            ? parsedResponse?.message
            : response?.status + ' : ' + response.statusText,
        statusCode: response?.status,
      }
      throw newError
    }

    const responseBody = parsedResponse as TFetchedData
    return { data: responseBody, error: null, statusCode: response.status }
  } catch (error: unknown) {
    return {
      data: null,
      error: { message: (error as ErrorResponse).message },
      statusCode: (error as ErrorResponse).statusCode as number,
    }
  }
}
