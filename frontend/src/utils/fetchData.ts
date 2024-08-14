type ErrorResponse = {
  message?: string
  statusCode?: number
}

type FetchResponse<TData> =
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
      const error = new Error((parsedResponse as { reason: string }).reason)
      throw error
    }

    const responseBody = parsedResponse as TFetchedData
    return { data: responseBody, error: null }
  } catch (error) {
    if (error instanceof Response) {
      const statusCode = error.status
      const errMsg = (await error.json()) as string
      return { data: null, error: { message: errMsg, statusCode } }
    }
  }

  return { data: null, error: { message: 'Something went wrong' } }
}
