'use client'

import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import event2 from '../../../public/02.svg'
import { useRouter } from 'next/navigation'

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
      className='bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto my-6 transition transform hover:scale-105 cursor-pointer h-[380px]'
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
      <div className='p-4 flex'>
        <div className='w-1/5'>
          <div className='mb-2 justify-center'>
            <span className='text-xl font-bold justify-center'>
              {dayjs(date).format('MMM')}
            </span>
            <br />
            <span className='text-xl font-bold justify-center'>
              {dayjs(date).format('YY')}
            </span>
          </div>
        </div>
        <div className='flex-1 text-left overflow-hidden'>
          <h2 className='text-xl font-semibold select-none line-clamp-2'>
            {title}
          </h2>
          <p className='text-gray-700 mb-2 line-clamp-4'>
            <span className='font-bold'>Mode: </span>
            {event_mode}
          </p>
          {venue && (
            <p className='text-gray-700 mb-2 line-clamp-4'>
              <span className='font-bold'>Venue: </span>
              <br />
              {venue}
            </p>
          )}
          {/* <p className='text-gray-600'>{dayjs(time).format('hh:mm A')}</p> */}
        </div>
      </div>
    </div>
  )
}

export default EventCard
