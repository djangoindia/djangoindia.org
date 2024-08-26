import React from 'react'

import { API_ENDPOINTS } from '@/constants'
import { EventContainer } from '@/containers'
import { Event } from '@/types'
import { PageProps } from '@/types/common'
import { fetchData } from '@/utils'

const EventPage = async ({
  params: { event },
}: PageProps<never, { event: string }>) => {
  const { data } = await fetchData<Event>(
    API_ENDPOINTS.event.replace(':id', event),
  )

  if (!data) {
    return
  }

  return <EventContainer event={data as Event} />
}

export default EventPage
