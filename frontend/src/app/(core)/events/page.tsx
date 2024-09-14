import React from 'react'

import { API_ENDPOINTS } from '@constants'
import { EventCard } from '@sections'
import { EventsResponse } from '@types'
import { fetchData } from '@utils'

const page = async (): Promise<JSX.Element> => {
  const { data: events } = await fetchData<EventsResponse>(API_ENDPOINTS.events)
  return (
    <div>
      <div className='mb-10 p-4 md:mb-20 lg:mb-48'>
        <div className='mb-4 flex flex-col items-center'>
          <h1 className='text-center text-3xl font-bold'>All Events</h1>
        </div>
        {events?.length ? (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {events?.map(
              (
                {
                  cover_image: coverImage,
                  event_start_date: eventStartDate,
                  name,
                  venue,
                  id,
                  event_mode: eventMode,
                },
                index,
              ) => (
                <div key={index} className='mb-4 h-auto w-full'>
                  <EventCard
                    eventId={id}
                    title={name}
                    date={eventStartDate}
                    imageSrc={coverImage}
                    venue={venue}
                    time={eventStartDate}
                    event_mode={eventMode}
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

export default page
