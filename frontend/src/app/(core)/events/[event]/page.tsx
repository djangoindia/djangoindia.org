import React from 'react'

import { API_ENDPOINTS } from '@constants'
import { EventContainer } from '@containers'
import { Event } from '@types'
import { fetchData } from '@utils'

import { PageProps } from '@types/common'

const eventPage = async ({
  params: { event },
}: PageProps<never, { event: string }>): Promise<JSX.Element | null> => {
  const { data } = await fetchData<Event>(
    API_ENDPOINTS.event.replace(':id', event),
  )

  if (!data) {
    return null
  }

  return <EventContainer event={data as Event} />
}

export default eventPage
