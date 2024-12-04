import React from 'react';

import { EventCard } from '@sections';

import { ClientError } from '@/components';
import { API_ENDPOINTS } from '@/constants';
import { fetchData } from '@/utils';

import type { EventsResponse } from '@/types';

const Page = async () => {
  const { data: events, error } = await fetchData<EventsResponse>(
    API_ENDPOINTS.events,
  );

  return (
    <div>
      <div className='mb-10 p-4 md:mb-20 lg:mb-48'>
        <div className='mb-4 flex flex-col items-center'>
          <h1 className='text-center text-3xl font-bold'>All Events</h1>
        </div>
        {error && error.message && <ClientError error={error} />}
        {events?.length ? (
          <div className='mx-auto grid w-fit grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {events?.map(
              (
                {
                  cover_image,
                  start_date,
                  name,
                  city,
                  id,
                  event_mode,
                  seats_left,
                  slug,
                },
                index,
              ) => (
                <div key={index} className='mb-4 h-auto w-full'>
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
              ),
            )}
          </div>
        ) : (
          <h3 className='text-center'>No Events</h3>
        )}
      </div>
    </div>
  );
};

export default Page;
