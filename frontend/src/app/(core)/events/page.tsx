import React from 'react'

import { API_ENDPOINTS } from '@/constants'
import { EventsResponse } from '@/types'
import { fetchData } from '@/utils'

import { EventCard } from '@sections'

const Page = async () => {
  const { data: events } = await fetchData<EventsResponse>(API_ENDPOINTS.events)
  return (
    <div>
      <div className='lg:mb-50 mb-10 p-4 md:mb-20'>
        <div className='mb-4 flex flex-col items-center'>
          <h1 className='text-center text-3xl font-bold'>All Events</h1>
        </div>
        {events?.length ? (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {events?.map(
              (
                { cover_image, event_start_date, name, venue, id, event_mode },
                index,
              ) => (
                <div key={index} className='mb-4 h-auto w-full'>
                  <EventCard
                    eventId={id}
                    title={name}
                    date={event_start_date}
                    imageSrc={cover_image}
                    venue={venue}
                    time={event_start_date}
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
