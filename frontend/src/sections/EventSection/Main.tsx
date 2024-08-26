import React from 'react'

import { API_ENDPOINTS } from '@/constants'
import { EventsResponse } from '@/types'
import { fetchData } from '@/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components'

import EventCard from './EventCard'

const Main: React.FC = async () => {
  const { data: events } = await fetchData<EventsResponse>(API_ENDPOINTS.events)

  return (
    <div className='lg:mb-50 mb-10 p-4 md:mb-20'>
      <div className='mx-20 mb-4 flex flex-row items-center justify-center'>
        <h1 className='text-center text-[40px] font-bold text-[#06038D]'>
          Upcoming Events
        </h1>
      </div>
      <div className='mx-auto max-w-7xl'>
        {events?.length ? (
          <Carousel>
            <CarouselContent>
              {events?.map(
                ({
                  cover_image,
                  event_start_date,
                  id,
                  name,
                  venue,
                  event_mode,
                }) => (
                  <CarouselItem
                    className='basis-1/1 sm:basis-1/2 md:basis-1/3'
                    key={id}
                  >
                    <div className='mb-4 h-auto w-full md:mb-0 md:w-auto'>
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
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <h3 className='text-center'>No Upcoming Events</h3>
        )}
      </div>
    </div>
  )
}

export default Main
