import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import event2 from '../../../public/02.svg'

interface EventProps {
  title: string
  date: string
  imageSrc: string
  venue: string
  time: string
}

const EventCard: React.FC<EventProps> = ({
  title,
  date,
  imageSrc,
  venue,
  time,
}) => {
  return (
    <div className='my-6 transition transform hover:scale-105'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto'>
        <div className='relative h-48 overflow-hidden'>
          <Image
            src={imageSrc ?? event2}
            alt={title}
            width={400}
            height={400}
            className='rounded-t-lg'
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover',
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
          <div className='flex-1 text-left'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <p className='text-gray-700 mb-2'>Venue: {venue}</p>
            <p className='text-gray-600'>{dayjs(time).format('hh:mm A')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
