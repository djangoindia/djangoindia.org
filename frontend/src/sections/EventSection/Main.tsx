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
    API_ENDPOINTS.allEvents,
  )

  return (
    <div className='p-4 mb-10 md:mb-20 lg:mb-50'>
      <div className='flex flex-row mx-20 justify-center items-center mb-4'>
        <h1 className='text-[40px] text-center text-[#06038D] font-bold'>
          Upcoming Events
        </h1>
      </div>
      <div className='max-w-4xl mx-auto'>
        {events?.length ? (
          <Carousel>
            <CarouselContent>
              {events?.map(({ cover_image, date_time, id, name, venue }) => (
                <CarouselItem className='basis-1/3' key={id}>
                  <div className='w-full md:w-auto h-auto mb-4 md:mb-0'>
                    <EventCard
                      title={name}
                      date={date_time}
                      imageSrc={cover_image}
                      venue={venue}
                      time={date_time}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <h3>No Upcoming Events</h3>
        )}
      </div>
    </div>
  )
}

export default Main
