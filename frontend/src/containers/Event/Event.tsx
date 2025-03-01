import React from 'react';

import { google } from 'calendar-link';
import Image from 'next/image';
import Link from 'next/link';
import { CiClock1, CiLocationOn } from 'react-icons/ci';
import { MdWavingHand } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import sanitizeHtml from 'sanitize-html';

import { dayjsWithTZ } from '@utils';

import { Button } from '@/components';
import { CommunityPartners } from '@/sections/CommunityPartners';
import { EventSponsors } from '@/sections/EventSponsors';
import { EventVolunteers } from '@/sections/EventVolunteers';
import { calculateDuration } from '@/utils';

import event1 from '../../../public/01.svg';
import wave1 from '../../../public/wave01.png';
import wave2 from '../../../public/wave02.png';
import splitAndCapitalize from '../../utils/formatKey';
import { RegisterEvent } from '../RegisterEvent';

import type { Event } from '@/types';

const EventContainer = async ({
  event: {
    name,
    cover_image,
    venue,
    venue_map_link,
    description,
    city,
    end_date,
    event_mode,
    start_date,
    registration_end_date,
    seats_left,
    sponsors,
    partners,
    volunteers,
    registration_status,
    rsvp_count,
    waitlist_count,
    cfp_open,
    registrations_open,
  },
}: {
  event: Event;
}) => {
  const sanitizedDescription = sanitizeHtml(description, {
    allowedTags: false,
    allowedAttributes: false,
  });

  const duration = calculateDuration(end_date, start_date);

  const eventLink = google({
    title: name,
    description,
    start: start_date,
    end: end_date,
    duration: [duration.hours, 'hours'],
  });

  const isSameDay = dayjsWithTZ(end_date)
    ? dayjsWithTZ(start_date).format('DD MMMM, YYYY') ===
      dayjsWithTZ(end_date).format('DD MMMM, YYYY')
    : false;

  return (
    <div>
      <div className='container'>
        <div className='relative mx-auto my-12 h-[60vh] w-full overflow-hidden rounded-2xl shadow-xl'>
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
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <h2 className='w-full text-4xl font-bold sm:w-auto md:text-6xl'>
              {name}
            </h2>
            <div className='flex w-full flex-wrap justify-end gap-3 sm:w-auto'>
              {registrations_open && (
                <RegisterEvent
                  status={registration_status}
                  seats_left={seats_left}
                />
              )}
              {cfp_open && (
                <Link
                  href='https://github.com/djangoindia/talks/issues/new?template=talk_proposal.yaml'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full sm:w-auto'
                >
                  <Button className='z-50 w-full bg-blue-900 sm:w-auto'>
                    Submit CFP
                  </Button>
                </Link>
              )}
            </div>
          </div>
          {start_date ? (
            <span>
              Starts {dayjsWithTZ(start_date).format('DD MMMM, YYYY')} at{' '}
              {dayjsWithTZ(start_date).format('hh:mm A')} (IST)
            </span>
          ) : (
            <span>Starts: TBA</span>
          )}
          {city && <span>City: {city}</span>}
          {rsvp_count > 2 && (
            <h4 className='text-xl font-bold'>
              {waitlist_count
                ? `${rsvp_count} RSVP'ed and ${waitlist_count} waitlisted.`
                : `${rsvp_count} RSVP'ed!`}
            </h4>
          )}
          <div className='my-12 flex flex-col gap-3 text-lg'>
            <span className='flex items-center gap-2'>
              Hey Everyone <MdWavingHand className='text-amber-500' />
            </span>
            <div
              className='prose'
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
          <div className='my-10 flex flex-col gap-2'>
            <h4 className='text-2xl font-bold'>When</h4>
            {start_date ? (
              <>
                <span className='flex items-center gap-2'>
                  <SlCalender />
                  {dayjsWithTZ(start_date).format('DD MMMM, YYYY')}
                  {end_date &&
                    !isSameDay &&
                    ` - ${dayjsWithTZ(end_date).format('DD MMMM, YYYY')}`}
                </span>
                <span className='flex items-center gap-2'>
                  <CiClock1 />
                  {dayjsWithTZ(start_date).format('hh:mm A')}
                  {end_date && ` - ${dayjsWithTZ(end_date).format('hh:mm A')}`}
                </span>
                {/* TODO: Use text variant of button */}
                <Button className='w-fit' asChild>
                  <Link href={eventLink} target='_blank'>
                    Add to Calender
                  </Link>
                </Button>
              </>
            ) : (
              'TBA'
            )}
          </div>
          {venue && (
            <div className='my-10 flex flex-col gap-2'>
              <h4 className='flex items-center gap-2 text-2xl font-bold'>
                <CiLocationOn />
                Where
              </h4>
              <p>{venue}</p>
            </div>
          )}
          <div>
            {venue_map_link && (
              <iframe
                src={venue_map_link}
                width='100%'
                className='mx-auto w-full rounded-2xl shadow-xl'
                height='450'
                loading='lazy'
                allowFullScreen
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            )}
          </div>
          {sponsors && <EventSponsors sponsors={sponsors} />}

          {partners && <CommunityPartners partners={partners} />}

          {volunteers && <EventVolunteers volunteers={volunteers} />}
        </div>
      </div>
      <div className='relative	mt-24 flex w-full flex-col items-center gap-3 overflow-hidden bg-orange-100 p-12'>
        <Image
          src={wave1}
          alt='wave 1'
          className='absolute left-0 top-0 z-0 opacity-20 md:opacity-100'
        />
        <Image
          src={wave2}
          alt='wave 2'
          className='absolute right-0 top-0 z-0 opacity-20 md:opacity-100'
        />
        <h5 className='text-center	text-4xl font-bold text-blue-900'>
          RSVP for this event now!
        </h5>
        {registration_end_date ? (
          <span>
            Registration ends:{' '}
            {dayjsWithTZ(registration_end_date).format('DD MMMM, YYYY')} at{' '}
            {dayjsWithTZ(registration_end_date).format('hh:mm A')} (IST)
          </span>
        ) : (
          <span>Registration ends: TBA</span>
        )}
        <span className='flex items-center gap-2'>
          <CiLocationOn />
          {splitAndCapitalize(event_mode)}
        </span>
        {registrations_open && (
          <RegisterEvent status={registration_status} seats_left={seats_left} />
        )}
      </div>
    </div>
  );
};

export default EventContainer;
