'use client'

import React from 'react'

import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import event2 from '../../../public/02.svg'

interface EventProps {
  eventId: string
  title: string
  date: string
  imageSrc: string
  venue: string
  time: string
  event_mode: string
}

const EventCard: React.FC<EventProps> = ({
  eventId,
  title,
  date,
  imageSrc,
  venue,
  time,
  event_mode,
}) => {
  const router = useRouter()

  return (
    <div
      className='mx-auto my-6 h-[380px] max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition hover:scale-105'
      onClick={() => router.push(`/events/${eventId}`)}
    >
      <div className='h-48 overflow-hidden'>
        <Image
          src={imageSrc ?? event2}
          alt={title}
          width={400}
          height={400}
          className='rounded-t-lg'
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className='flex p-4'>
        <div className='w-1/5'>
          <div className='mb-2 justify-center'>
            <span className='justify-center text-xl font-bold'>
              {dayjs(date).format('MMM')}
            </span>
            <br />
            <span className='justify-center text-xl font-bold'>
              {dayjs(date).format('YY')}
            </span>
          </div>
        </div>
        <div className='flex-1 overflow-hidden text-left'>
          <h2 className='line-clamp-2 select-none text-xl font-semibold'>
            {title}
          </h2>
          <p className='mb-2 line-clamp-4 text-gray-700'>
            <span className='font-bold'>Mode: </span>
            {event_mode}
          </p>
          {venue && (
            <p className='mb-2 line-clamp-4 text-gray-700'>
              <span className='font-bold'>Venue: </span>
              <br />
              {venue}
            </p>
          )}
          <p className='text-gray-600'>{dayjs(time).format('hh:mm A')}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard
