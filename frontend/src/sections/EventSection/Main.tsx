import React from 'react'
import EventCard from './EventCard'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components'
import { fetchData } from '@/utils'
import { API_ENDPOINTS } from '@/constants'
import { EventsResponse } from '@/types'

const Main: React.FC = async () => {
  const { data: events } = await fetchData<EventsResponse>(
    API_ENDPOINTS.events,
  )

  return (
    <div className='p-4 mb-10 md:mb-20 lg:mb-50'>
      <div className='flex flex-row mx-20 justify-center items-center mb-4'>
        <h1 className='text-[40px] text-center text-[#06038D] font-bold'>
          Upcoming Events
        </h1>
      </div>
      <div className='max-w-7xl mx-auto'>
        {events?.length ? (
          <Carousel>
            <CarouselContent>
              {events?.map(({ cover_image, event_start_date, id, name, venue,event_mode }) => (
                <CarouselItem
                  className='basis-1/1 sm:basis-1/2 md:basis-1/3'
                  key={id}
                >
                  <div className='w-full md:w-auto h-auto mb-4 md:mb-0'>
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
              ))}
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
