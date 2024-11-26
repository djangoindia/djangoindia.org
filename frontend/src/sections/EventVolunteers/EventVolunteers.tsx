'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowRight,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

import { Button } from '@components';

import account from '../../../public/account.png';

type Volunteer = {
  name?: string;
  photo?: string;
  about?: string | null;
  email?: string;
  twitter?: string | null;
  linkedin?: string | null;
};

type EventVolunteersProps = {
  volunteers?: Volunteer[];
};

const EventVolunteers: React.FC<EventVolunteersProps> = ({
  volunteers = [],
}) => {
  if (volunteers.length === 0) {
    return (
      <div className='flex flex-col items-start justify-start py-10'>
        <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Event Volunteers</h4>
          <Link
            href={process.env.NEXT_PUBLIC_EVENT_VOLUNTEER_FORM || '#'}
            target='_blank'
            passHref
          >
            <Button className='group ml-2 overflow-hidden transition-all'>
              <span className='w-0 overflow-hidden whitespace-nowrap transition-all group-hover:w-auto'>
                Become a volunteer
              </span>
              <FaArrowRight className='ml-0 transition-all group-hover:ml-2' />
            </Button>
          </Link>
        </div>
        <p className='mt-4 text-gray-500'>
          No volunteers are available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 py-10'>
      <div className='flex items-center'>
        <h4 className='text-2xl font-bold'>Event Volunteers</h4>
        <Link
          href={process.env.NEXT_PUBLIC_EVENT_VOLUNTEER_FORM || '#'}
          target='_blank'
          passHref
        >
          <Button className='group ml-2 overflow-hidden transition-all'>
            <span className='w-0 overflow-hidden whitespace-nowrap transition-all group-hover:w-auto'>
              Become a volunteer
            </span>
            <FaArrowRight className='ml-0 transition-all group-hover:ml-2' />
          </Button>
        </Link>
      </div>
      <p className='font-medium text-gray-700'>
        Our volunteers are the heart of this event, working behind the scenes to
        make everything run seamlessly.
      </p>
      <div className='flex flex-wrap gap-8'>
        {volunteers.map((volunteer, index) => (
          <div
            key={index}
            className='group relative flex h-[150px] w-full items-center gap-4 overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg md:w-1/3 lg:w-[23%]'
          >
            <div className='absolute inset-0 flex items-center gap-3 p-4 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0'>
              <div className='size-[60px] shrink-0'>
                <Image
                  src={volunteer.photo ? volunteer.photo : account}
                  alt={`${volunteer.name || 'Volunteer'}'s photo`}
                  width={60}
                  height={60}
                  className='size-full rounded-full border border-gray-300 object-cover'
                />
              </div>
              <div className='flex flex-col'>
                <h6 className='text-lg font-semibold text-gray-800'>
                  {volunteer.name ? volunteer.name : 'Anonymous Volunteer'}
                </h6>
                {volunteer.about ? (
                  <p className='mt-1 text-sm text-gray-600'>
                    {volunteer.about}
                  </p>
                ) : (
                  <p className='mt-1 text-sm italic text-gray-400'>
                    No description available
                  </p>
                )}
              </div>
            </div>

            <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
              {volunteer.email || volunteer.linkedin || volunteer.twitter ? (
                <div className='flex gap-8'>
                  {volunteer.email && (
                    <Link
                      href={`mailto:${volunteer.email}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <FaEnvelope size={28} />
                    </Link>
                  )}
                  {volunteer.linkedin && (
                    <Link
                      href={volunteer.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <FaLinkedin size={28} />
                    </Link>
                  )}
                  {volunteer.twitter && (
                    <Link
                      href={volunteer.twitter}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <FaTwitter size={28} />
                    </Link>
                  )}
                </div>
              ) : (
                <p className='italic text-gray-400'>
                  No social links available
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventVolunteers;
