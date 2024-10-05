import React from 'react'
import EventCard from './EventCard'
import { dayjsWithTZ } from '@utils'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  ClientError,
} from '@components'
import { fetchData } from '@/utils'
import { API_ENDPOINTS } from '@/constants'
import { EventsResponse } from '@/types'

const Main: React.FC = async () => {
  const { data: events, error } = await fetchData<EventsResponse>(
    API_ENDPOINTS.events,
  )
  const filtered_events = events?.filter((event) => {
    const eventStartDate = dayjsWithTZ(event.start_date);
    const currentDate = dayjsWithTZ();

    return eventStartDate.isAfter(currentDate) || event.start_date === null
  });
  
  return (
    <div className='p-4 mb-10 md:mb-20 lg:mb-50'>
      <div className='flex flex-row mx-20 justify-center items-center mb-4'>
        <h1 className='text-[40px] text-center text-[#06038D] font-bold'>
          Upcoming Events
        </h1>
      </div>
      <div className='max-w-7xl mx-auto overflow-x'>
        {error && error.message && <ClientError error={error} />}
        {filtered_events?.length ? (
          <Carousel>
            <CarouselContent>
              {filtered_events?.map(({ cover_image, start_date, id, name, city, event_mode, seats_left, slug }) => (
                <CarouselItem
                  className='basis-1/1 sm:basis-1/2 md:basis-1/3'
                  key={id}
                >
                  <div className='w-full md:w-auto h-auto mb-4 md:mb-0'>
                    <EventCard
                      eventId={id}
                      slug={slug}
                      title={name}
                      date={start_date}
                      imageSrc={cover_image}
                      city={city}
                      time={start_date}
                      event_mode={event_mode}
                      seats_left={(seats_left)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <h3 className='text-center'>No Upcoming Events</h3>
        )}
      </div>
    </div>
  )
}

export default Main
