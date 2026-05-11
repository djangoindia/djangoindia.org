import React from 'react';

import { API_ENDPOINTS } from '@/constants';
import { EventContainer } from '@/containers';
import { fetchData } from '@/utils';
import { getAccessToken } from '@/utils/getAccesstoken';

import type { Event } from '@/types';
import type { PageProps } from '@/types/common';

const EventPage = async ({
  params: { event },
}: PageProps<never, { event: string }>) => {
  const accessToken = await getAccessToken();
  const { data, error } = await fetchData<Event>(
    API_ENDPOINTS.event.replace(':id', event),
    {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );

  if (error) {
    return (
      <section className='container py-10'>
        <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center'>
          <h2 className='text-2xl font-semibold'>
            This event is temporarily unavailable due to some reason
          </h2>
          <p className='mt-2 text-zinc-600'>It will be available soon.</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className='container py-10'>
        <h2 className='text-center text-2xl font-bold'>Event not found</h2>
      </section>
    );
  }

  return <EventContainer event={data as Event} />;
};

export default EventPage;
