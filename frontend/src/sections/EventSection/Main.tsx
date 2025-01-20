import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  ClientError,
} from '@components';
import { dayjsWithTZ } from '@utils';

import { API_ENDPOINTS } from '@/constants';
import { fetchData } from '@/utils';

import EventCard from './EventCard';

import type { EventsResponse } from '@/types';

const Main: React.FC = async () => {
  const { data: events, error } = await fetchData<EventsResponse>(
    API_ENDPOINTS.events,
  );
  const filtered_events = events?.filter((event) => {
    const eventStartDate = dayjsWithTZ(event.start_date);
    const currentDate = dayjsWithTZ();

    return eventStartDate.isAfter(currentDate) || event.start_date === null;
  });

  return (
    <div className='mb-10 p-4 md:mb-20 lg:mb-48'>
      <div className='mx-20 mb-4 flex flex-row items-center justify-center'>
        <h1 className='text-center text-[40px] font-bold text-[#06038D]'>
          Upcoming Events
        </h1>
      </div>
      <div className='mx-auto max-w-7xl overflow-x-auto'>
        {error && error.message && <ClientError error={error} />}
        {filtered_events?.length ? (
          <Carousel>
            <CarouselContent className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {filtered_events?.map(
                ({
                  cover_image,
                  start_date,
                  id,
                  name,
                  city,
                  event_mode,
                  seats_left,
                  slug,
                }) => (
                  <CarouselItem
                    className='w-full h-auto'  // ensures full width on mobile
                    key={id}
                  >
                    <div className='mb-4 h-auto'>
                      <EventCard
                        eventId={id}
                        slug={slug}
                        title={name}
                        date={start_date}
                        imageSrc={cover_image}
                        city={city}
                        time={start_date}
                        event_mode={event_mode}
                        seats_left={seats_left}
                      />
                    </div>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
          </Carousel>
        ) : (
          <h3 className='text-center'>No Upcoming Events</h3>
        )}
      </div>
    </div>
  );
};

export default Main;
