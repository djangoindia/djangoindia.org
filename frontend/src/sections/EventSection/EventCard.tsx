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
      className='mx-auto my-6 h-[380px] max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition md:max-w-sm md:hover:scale-105'
      onClick={() => router.push(`/events/${slug}`)}
    >
      <div className='h-48 overflow-hidden'>
        <Image
          src={imageSrc ?? (event_mode === 'online' ? event2 : event3)}
          alt={title}
          width={400}
          height={400}
          className='rounded-t-lg'
          style={
            imageSrc
              ? {
                  maxWidth: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }
              : {
                  maxWidth: '100%',
                  height: 'auto',
                }
          }
        />
      </div>
      <div className='flex h-1/2 p-4'>
        {date && (
          <div className='w-1/5'>
            <div className='mb-2 justify-center'>
              <span className='justify-center text-xl font-bold'>
                {dayjsWithTZ(date).format('MMM')}
              </span>
              <br />
              <span className='justify-center text-xl font-bold'>
                {dayjsWithTZ(date).format('DD')}
              </span>
              <br />
              <span className='justify-center text-xs font-bold'>
                {dayjsWithTZ(time).format('hh:mm A')}
              </span>
            </div>
          </div>
        )}
        <div className='flex-1 space-y-2 overflow-hidden text-left'>
          <h2 className='line-clamp-2 select-none text-xl font-semibold'>
            {title}
          </h2>
          <p className='mb-2 ml-0 line-clamp-4 flex items-center text-gray-700'>
            <Image
              src={event_mode_img}
              alt='event-mode'
              width={26}
              height={26}
              className='mr-1'
            />
            {splitAndCapitalize(event_mode)}
          </p>
          {
            <p className='mb-2 line-clamp-4 flex items-center text-gray-700'>
              <Image
                src={city_img}
                alt='city'
                width={26}
                height={26}
                className='mr-1'
              />
              {city ? city : 'TBA'}
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default EventCard;
