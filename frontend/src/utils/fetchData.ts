type ErrorResponse = {
  message?: string
  statusCode?: number
}

export type FetchResponse<TData> =
  | {
      data: TData
      error?: null
    }
  | {
      data?: null
      error: ErrorResponse
    }

export const fetchData = async <TFetchedData>(
  path: string,
  options: RequestInit = { method: 'GET' },
): Promise<FetchResponse<TFetchedData>> => {
  try {
    const { method, ...restOptions } = options
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}/`, {
      method,
      ...restOptions,
      headers: {
        ...restOptions.headers,
        'Content-Type': 'application/json',
      },
    })

    const parsedResponse = await response.json()

    if (!response.ok) {
      throw new Error(parsedResponse.error)
    }

    const responseBody = parsedResponse as TFetchedData
    return { data: responseBody, error: null }
  } catch (error) {
   if (error instanceof Error) {
      // Handle network errors or other errors
      return { data: null, error: { message: error.message } }
    } else {
      // Handle unknown errors
      return { data: null, error: { message: 'Something went wrong' } }
    }
  }
}
