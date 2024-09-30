'use client'

import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import event2 from '../../../public/02.svg'
import event3 from '../../../public/03.svg'
import event_mode_img from '../../../public/event_mode.svg'
import city_img from '../../../public/location.svg'
import seats from '../../../public/ticket.svg'
import { useRouter } from 'next/navigation'
import splitAndCapitalize from '../../utils/formatKey'

interface EventProps {
  eventId: string
  slug: string
  title: string
  date: string
  imageSrc: string
  city: string
  time: string
  event_mode: string
  seats_left: BigInteger
}

const EventCard: React.FC<EventProps> = ({
  eventId,
  slug,
  title,
  date,
  imageSrc,
  city,
  time,
  event_mode,
  seats_left,
}) => {
  const router = useRouter()
  return (
    <div
      className='bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto my-6 transition transform hover:scale-105 cursor-pointer h-[380px]'
      onClick={() => router.push(`/events/${slug}`)}
    >
      <div className='h-48 overflow-hidden'>
        <Image
          src={imageSrc ?? (event_mode == "online" ? event2 : event3)}
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
      <div className='p-4 flex h-[50%]'>
        {date && (<div className='w-1/5'>
          <div className='mb-2 justify-center'>
            <span className='text-xl font-bold justify-center'>
              {dayjs(date).format('MMM')}
            </span>
            <br />
            <span className='text-xl font-bold justify-center'>
              {dayjs(date).format('YY')}
            </span>
            <br/>
            <span className='text-xs font-bold justify-center'>
              {dayjs(time).format('hh:mm A')}
            </span>
          </div>
        </div>)}
        <div className='flex-1 text-left overflow-hidden space-y-2'>
          <h2 className='text-xl font-semibold select-none line-clamp-2'>
            {title}
          </h2>
          <p className='text-gray-700 mb-2 line-clamp-4 flex items-center ml-0'>
          <Image src={event_mode_img} width={26} height={26} className='mr-1'/>
            {splitAndCapitalize(event_mode)}
          </p>
          {<p className='text-gray-700 mb-2 line-clamp-4 flex items-center'>
            <Image src={city_img} width={26} height={26} className='mr-1'/>
            {city ? city:'TBA'}
          </p>}
          {seats_left && (<p className='flex items-center'><Image src={seats} width={26} height={26} className='mr-1'/>{seats_left} Seats left</p>)}
        </div>
      </div>
    </div>
  )
}

export default EventCard
