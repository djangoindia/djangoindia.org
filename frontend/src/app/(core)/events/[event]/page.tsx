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
  const { data } = await fetchData<Event>(
    API_ENDPOINTS.event.replace(':id', event),
    {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );

  if (!data) {
    return;
  }

  return <EventContainer event={data as Event} />;
};

export default EventPage;
