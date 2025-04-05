import React from 'react';

import { google } from 'calendar-link';
import Image from 'next/image';
import Link from 'next/link';
import { CiLocationOn } from 'react-icons/ci';
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { MdOutlineCalendarToday, MdWavingHand } from 'react-icons/md';
import sanitizeHtml from 'sanitize-html';

import { dayjsWithTZ } from '@utils';

import { Button, Card, CardContent } from '@/components';
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
    <div className='font-sans'>
      <div className='relative h-[75vh] w-full'>
        <Image
          src={cover_image ?? event1}
          alt={name}
          style={{ objectFit: 'cover' }}
          className='absolute inset-0 size-full'
          fill
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent'>
          <div className='container mx-auto flex h-full flex-col'>
            <div className='mt-auto pb-2'>
              <h1 className='mb-6 max-w-4xl text-xl font-bold leading-tight text-white md:text-3xl lg:text-5xl'>
                {name}
              </h1>

              <div className='mb-6 flex flex-wrap gap-4 text-xs'>
                {start_date && (
                  <div className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm'>
                    <MdOutlineCalendarToday />
                    <span>
                      {dayjsWithTZ(start_date).format('DD MMMM, YYYY')}
                      {end_date &&
                        !isSameDay &&
                        ` - ${dayjsWithTZ(end_date).format('DD MMMM, YYYY')}`}
                    </span>
                  </div>
                )}

                {venue && (
                  <div className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm'>
                    <CiLocationOn />
                    <span>{venue}</span>
                  </div>
                )}

                {event_mode && (
                  <div className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm'>
                    <FaMapMarkerAlt />
                    <span>{splitAndCapitalize(event_mode)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-4 max-w-4xl p-2'>
        <Card className='w-full overflow-hidden bg-white shadow-sm'>
          <CardContent className='p-4 sm:p-6'>
            <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
              <div className='space-y-3'>
                {start_date ? (
                  <>
                    <div className='flex items-center gap-2 text-sm sm:text-base'>
                      <MdOutlineCalendarToday className='text-blue-900' />
                      <span className='font-medium'>
                        {dayjsWithTZ(start_date).format('DD MMMM, YYYY')}
                        {end_date &&
                          !isSameDay &&
                          ` - ${dayjsWithTZ(end_date).format('DD MMMM, YYYY')}`}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-sm sm:text-base'>
                      <IoTime className='text-blue-900' />
                      <span className='font-medium'>
                        {dayjsWithTZ(start_date).format('hh:mm A')}
                        {end_date &&
                          ` - ${dayjsWithTZ(end_date).format('hh:mm A')}`}{' '}
                        <span className='text-gray-600'>(IST)</span>
                      </span>
                    </div>
                    {venue && (
                      <div className='flex items-center gap-2 text-sm sm:text-base'>
                        <CiLocationOn className='text-blue-900' />
                        <span className='font-medium'>{`${venue} - ${city}`}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='text-xl font-medium text-blue-900'>
                    Date and Time TBA
                  </div>
                )}
              </div>

              <div className='flex flex-col gap-3 sm:items-end'>
                {registrations_open && (
                  <RegisterEvent
                    status={registration_status}
                    seats_left={seats_left}
                  />
                )}

                <div className='flex flex-wrap gap-3'>
                  {cfp_open && (
                    <Link
                      href='https://github.com/djangoindia/talks/issues/new?template=talk_proposal.yaml'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button
                        className='w-full bg-blue-900 hover:bg-blue-800'
                        size='sm'
                      >
                        Submit CFP
                      </Button>
                    </Link>
                  )}

                  {start_date && (
                    <Button
                      className='flex w-full items-center gap-2 border border-blue-900/20 bg-white text-blue-900 hover:bg-blue-50 sm:w-auto'
                      asChild
                      size='sm'
                    >
                      <Link href={eventLink} target='_blank'>
                        <MdOutlineCalendarToday className='size-4' />
                        <span>Add to Calendar</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {rsvp_count > 0 && (
          <div className='mt-4 sm:mt-6'>
            <Card className='w-full overflow-hidden bg-white shadow-sm'>
              <CardContent className='p-4 sm:p-6'>
                <h3 className='mb-2 text-base font-semibold text-gray-500 sm:text-lg'>
                  Attendees
                </h3>
                <div className='flex items-center gap-2'>
                  <FaUserFriends className='text-blue-900' />
                  <span className='text-lg font-medium text-blue-900 sm:text-xl'>
                    {waitlist_count > 0
                      ? `${rsvp_count} RSVP'ed, ${waitlist_count} waitlisted`
                      : `${rsvp_count} RSVP'ed!`}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-8 flex items-center gap-2'>
            <h2 className='text-3xl font-bold text-blue-900'>
              About This Event
            </h2>
            <MdWavingHand className='text-3xl text-amber-500' />
          </div>

          <div
            className='prose prose-lg mb-16 max-w-none text-gray-700'
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </div>

        {venue_map_link && (
          <div className='mx-auto my-16 max-w-5xl'>
            <h2 className='mb-6 text-3xl font-bold text-blue-900'>
              Event Location
            </h2>
            <div className='overflow-hidden rounded-2xl shadow-xl'>
              <iframe
                src={venue_map_link}
                width='100%'
                height='450'
                loading='lazy'
                allowFullScreen
                referrerPolicy='no-referrer-when-downgrade'
                className='w-full'
              ></iframe>
            </div>
          </div>
        )}

        <div className='my-24 space-y-20'>
          {sponsors && (
            <div className='rounded-2xl bg-white p-8 shadow-sm'>
              <EventSponsors sponsors={sponsors} />
            </div>
          )}

          {partners && (
            <div className='rounded-2xl bg-white p-8 shadow-sm'>
              <CommunityPartners partners={partners} />
            </div>
          )}

          {volunteers && (
            <div className='rounded-2xl bg-white p-8 shadow-sm'>
              <EventVolunteers volunteers={volunteers} />
            </div>
          )}
        </div>
      </div>

      <div className='relative overflow-hidden bg-orange-100 py-24'>
        <Image
          src={wave1}
          alt='wave 1'
          className='absolute left-0 top-0 z-0 opacity-30 md:opacity-100'
        />
        <Image
          src={wave2}
          alt='wave 2'
          className='absolute right-0 top-0 z-0 opacity-30 md:opacity-100'
        />

        <div className='container relative z-10 mx-auto px-4'>
          <div className='mx-auto max-w-3xl rounded-3xl bg-white/70 p-12 text-center shadow-xl backdrop-blur-sm'>
            <h2 className='mb-6 text-4xl font-bold text-blue-900'>
              RSVP for this event now!
            </h2>

            {registration_end_date ? (
              <p className='mb-6 text-gray-700'>
                Registration ends:{' '}
                <span className='font-semibold'>
                  {dayjsWithTZ(registration_end_date).format('DD MMMM, YYYY')}{' '}
                  at {dayjsWithTZ(registration_end_date).format('hh:mm A')}{' '}
                  (IST)
                </span>
              </p>
            ) : (
              <p className='mb-6 text-gray-700'>
                Registration ends: <span className='font-semibold'>TBA</span>
              </p>
            )}

            {registrations_open && (
              <div className='mx-auto mt-8 flex max-w-screen-xs items-center justify-evenly'>
                <RegisterEvent
                  status={registration_status}
                  seats_left={seats_left}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
