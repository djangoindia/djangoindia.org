import React from 'react'

import { EventCard } from '@sections'
import { fetchData } from '@/utils'
import { EventsResponse } from '@/types'
import { API_ENDPOINTS } from '@/constants'
import { ClientError } from '@/components'

const Page = async () => {
  const { data: events, error } = await fetchData<EventsResponse>(
    API_ENDPOINTS.events,
  )

  return (
    <div>
      <div className='p-4 mb-10 md:mb-20 lg:mb-50'>
        <div className='flex flex-col items-center mb-4'>
          <h1 className='text-3xl text-center font-bold'>All Events</h1>
        </div>
        {error && error.message && <ClientError error={error} />}
        {events?.length ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {events?.map(
              ({ cover_image, start_date, name, venue, id, event_mode }, index) => (
                <div key={index} className='w-full h-auto mb-4'>
                  <EventCard
                    eventId={id}
                    title={name}
                    date={start_date}
                    imageSrc={cover_image}
                    venue={venue}
                    time={start_date}
                    event_mode={event_mode}
                  />
                </div>
              ),
            )}
          </div>
        ) : (
          <h3 className='text-center'>No Events</h3>
        )}
      </div>
    </div>
  )
}

export default Page
