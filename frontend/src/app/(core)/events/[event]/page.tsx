import React from 'react';

import { API_ENDPOINTS } from '@/constants';
import { EventContainer } from '@/containers';
import { fetchData } from '@/utils';

import type { Event } from '@/types';
import type { PageProps } from '@/types/common';

const EventPage = async ({
  params: { event },
}: PageProps<never, { event: string }>) => {
  const { data } = await fetchData<Event>(
    API_ENDPOINTS.event.replace(':id', event),
  );

  if (!data) {
    return;
  }

  return <EventContainer event={data as Event} />;
};

export default EventPage;
