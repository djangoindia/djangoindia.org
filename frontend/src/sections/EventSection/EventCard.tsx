'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { dayjsWithTZ } from '@utils';

import event2 from '../../../public/02.svg';
import event3 from '../../../public/03.svg';
import event_mode_img from '../../../public/event_mode.svg';
import city_img from '../../../public/location.svg';
import seats from '../../../public/ticket.svg';
import splitAndCapitalize from '../../utils/formatKey';

interface EventProps {
  eventId: string;
  slug: string;
  title: string;
  date: string;
  imageSrc: string;
  city: string;
  time: string;
  event_mode: string;
  seats_left: number;
}

const EventCard: React.FC<EventProps> = ({
  slug,
  title,
  date,
  imageSrc,
  city,
  time,
  event_mode,
  seats_left,
}) => {
  const router = useRouter();

  return (
    <div
      className='relative mx-auto my-6 w-full max-w-md cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition md:hover:scale-105'
      onClick={() => router.push(`/events/${slug}`)}
    >
      <div className='relative h-72 w-full overflow-hidden'>
        <Image
          src={imageSrc ?? (event_mode === 'online' ? event2 : event3)}
          alt={title}
          width={600}
          height={350}
          className='h-full w-full object-cover'
          style={{
            maxWidth: '100%',
            height: '100%',
          }}
        />

        {/* Gradient overlay - black opacity at the bottom */}
        <div
          className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/95 to-transparent'
          aria-hidden='true'
        />
      </div>

      <div className='absolute bottom-0 left-0 right-0 p-3'>
        <div className='mb-2 flex gap-3'>
          {city && (
            <div className='rounded-full bg-[#F2ECE4] px-3 py-1 text-base font-semibold text-black shadow-md'>
              {city}
            </div>
          )}
          {event_mode && (
            <div className='rounded-full bg-[#F2ECE4] px-3 py-1 text-base font-semibold text-black shadow-md'>
              {splitAndCapitalize(event_mode)}
            </div>
          )}
        </div>

        <div className='mt-3 text-left text-white w-3/5'>
          <h2 className='text-xl font-semibold leading-tight drop-shadow-md'>
            {title}
          </h2>
        </div>
      </div>

      <div className='absolute right-2 bottom-2 flex flex-col items-center justify-center rounded-xl bg-[#F2ECE4] px-4 py-2 shadow-lg'>
        <div className='text-center'>
          <div className='text-xl font-bold uppercase text-black'>
            {dayjsWithTZ(date).format('MMM')}
          </div>
          <div className='text-3xl font-bold text-black'>
            {dayjsWithTZ(date).format('DD')}
          </div>
          <div className='mt-1 text-base font-bold text-black'>
            {dayjsWithTZ(time).format('h:mm A')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
