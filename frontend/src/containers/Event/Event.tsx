import Image from 'next/image'
import React from 'react'
import event1 from '../../../public/01.svg'
import wave1 from '../../../public/wave01.png'
import wave2 from '../../../public/wave02.png'

import dayjs from 'dayjs'

import { Button } from '@/components'
import { CiClock1, CiLocationOn } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { MdWavingHand } from 'react-icons/md'
import { RegisterEvent } from '../RegisterEvent'
import { google } from 'calendar-link'
import type { Event } from '@/types'
import Link from 'next/link'
import { calculateDuration } from '@/utils'
import sanitizeHtml from 'sanitize-html';


const EventContainer = async ({
  event: {
    name,
    cover_image,
    venue,
    venue_map_link,
    description,
    city,
    event_end_date,
    event_mode,
    event_start_date,
    registration_end_date,
  },
}: {
  event: Event
}) => {
  const sanitizedDescription = sanitizeHtml(description, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    allowedAttributes: {
      a: ['href','target'],
    },
  });

  const duration = calculateDuration(event_end_date, event_start_date)

  const eventLink = google({
    title: name,
    description,
    start: event_start_date,
    end: event_end_date,
    duration: [duration.hours, 'hours'],
  })

  return (
    <div>
      <div className='container'>
        <div className='relative w-full h-96 my-12 rounded-2xl mx-auto overflow-hidden shadow-xl'>
          <Image
            src={cover_image ?? event1}
            alt={name}
            style={{
              objectFit: 'cover',
            }}
            fill
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-6xl font-bold'>{name}</h2>
          <span>Starts {dayjs(event_start_date).format('DD MMMM, YYYY')} at {dayjs(event_start_date).format('hh:mm A')}</span>
          {city && <span>City: {city}</span>}
          <RegisterEvent />
          <div className='my-12 text-l flex flex-col gap-3'>
            <span className='flex items-center gap-2'>
              Hey Everyone <MdWavingHand className='text-amber-500' />
            </span>
            <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
          </div>
          <div className='my-10 flex flex-col gap-2'>
            <h4 className='text-2xl font-bold'>When</h4>
            <span className='flex items-center gap-2'>
              <SlCalender />
              {dayjs(event_start_date).format('DD MMMM, YYYY')}
              {event_end_date && ` - ${dayjs(event_end_date).format('DD MMMM, YYYY')}`}
            </span>
            <span className='flex items-center gap-2'>
              <CiClock1 />
              {dayjs(event_start_date).format('hh:mm A')} -
              {dayjs(event_end_date).format('hh:mm A')}
            </span>
            {/* TODO: Use text variant of button */}
            <Button className='w-fit' asChild>
              <Link href={eventLink} target='_blank'>
                Add to Calender
              </Link>
            </Button>
          </div>
          {venue && <div className='my-10 flex flex-col gap-2'>
            <h4 className='text-2xl font-bold flex items-center gap-2'>
              <CiLocationOn />
              Where
            </h4>
            <p>{venue}</p>
          </div>}
          <div>
            {venue_map_link && <iframe
              src={venue_map_link}
              width='100%'
              className='rounded-2xl w-full mx-auto shadow-xl'
              height='450'
              loading='lazy'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>}
          </div>
        </div>
      </div>
      <div className='bg-orange-100	relative w-full p-12 mt-24 flex flex-col items-center gap-3 overflow-hidden'>
        <Image src={wave1} alt='wave 1' className='absolute left-0 top-0' />
        <Image src={wave2} alt='wave 2' className='absolute right-0 top-0' />
        <h5 className='text-4xl	font-bold text-blue-900 text-center'>
          RSVP for this event now!
        </h5>
        <span>Registration ends {dayjs(registration_end_date).format('DD MMMM, YYYY')} at {dayjs(registration_end_date).format('hh:mm A')}</span>
        <span className='flex items-center gap-2'>
          <CiLocationOn />
          {event_mode}
        </span>
        <RegisterEvent />
      </div>
    </div>
  )
}

export default EventContainer
