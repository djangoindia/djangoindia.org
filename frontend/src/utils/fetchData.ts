import { ContactUsForm } from '@/containers/ContactUs/ContactUs.types'
import { NewsletterForm } from '@/sections/Latestupdate/LatestUpdate'
import axios from 'axios'

type ErrorResponse = {
  message?: string
  statusCode?: number
}

export type FetchResponse<TData> = {
  data: TData | null
  error?: ErrorResponse | null
  statusCode: number
}

export const fetchData = async <TFetchedData>(
  path: string,
): Promise<FetchResponse<TFetchedData>> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${path}/`,
    )

    const responseBody = response.data as TFetchedData
    return { data: responseBody, error: null, statusCode: response.status }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const message = error.response?.data?.message || 'An error occurred'
      return {
        data: null,
        error: { message, statusCode },
        statusCode,
      }
    } else {
      return {
        data: null,
        error: { message: 'Unknown error', statusCode: 500 },
        statusCode: 500,
      }
    }
  }
}

export const postData = async <TFetchedData>(
  path: string,
  data: NewsletterForm | ContactUsForm,
): Promise<FetchResponse<TFetchedData>> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${path}/`,
      {
        ...data,
      },
    )

    const responseBody = response.data as TFetchedData
    return { data: responseBody, error: null, statusCode: response.status }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const message = error.response?.data?.message || 'An error occurred'
      return {
        data: null,
        error: { message, statusCode },
        statusCode,
      }
    } else {
      return {
        data: null,
        error: { message: 'Unknown error', statusCode: 500 },
        statusCode: 500,
      }
    }
  }
}
