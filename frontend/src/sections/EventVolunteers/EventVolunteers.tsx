'use client'
import React from 'react';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import account from '../../../public/account.png'
import { Button } from '@components'
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";

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

const EventVolunteers: React.FC<EventVolunteersProps> = ({ volunteers = [] }) => {
  if (volunteers.length === 0) {
    return (
      <div className='flex flex-col items-left justify-left py-10'>
        <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Event Volunteers</h4>
          <Link href={process.env.EVENT_VOLUNTEER_FORM || '#'} target='_blank' passHref>
            <Button className='ml-2 group transition-all linear overflow-hidden'>
              <span className='w-0 group-hover:w-auto overflow-hidden whitespace-nowrap transition-all linear'>
                Become a volunteer
              </span>
              <FaArrowRight className='ml-0 group-hover:ml-2 transition-all linear' />
            </Button>
          </Link>
        </div>
        <p className='text-gray-500 mt-4'>No volunteers are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 py-10'>
      <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Event Volunteers</h4>
          <Link href={process.env.EVENT_VOLUNTEER_FORM || '#'} target='_blank' passHref>
            <Button className='ml-2 group transition-all linear overflow-hidden'>
              <span className='w-0 group-hover:w-auto overflow-hidden whitespace-nowrap transition-all linear'>
                Become a volunteer
              </span>
              <FaArrowRight className='ml-0 group-hover:ml-2 transition-all linear' />
            </Button>
          </Link>
        </div>
      <p className='font-medium text-gray-700'>
        Our volunteers are the heart of this event, working behind the scenes to make everything run seamlessly.
      </p>
      <div className='flex flex-wrap gap-8'>
        {volunteers.map((volunteer, index) => (
          <div
            key={index}
            className='relative bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg group flex items-center gap-4 p-5 w-full md:w-1/3 lg:w-[23%] h-[150px] overflow-hidden'
          >
            <div className='absolute inset-0 flex items-center gap-3 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 p-4'>
            <div className='w-[60px] h-[60px] flex-shrink-0'>
                <Image
                  src={volunteer.photo ? `http://localhost:8000${volunteer.photo}`: account}
                  alt={`${volunteer.name || 'Volunteer'}'s photo`}
                  width={60}
                  height={60}
                  className='rounded-full border border-gray-300 object-cover w-full h-full'
                />
                </div>
              <div className='flex flex-col'>
                <h6 className='text-lg font-semibold text-gray-800'>
                  {volunteer.name ? volunteer.name : 'Anonymous Volunteer'}
                </h6>
                {volunteer.about ? (
                  <p className='text-gray-600 text-sm mt-1'>{volunteer.about}</p>
                ) : (
                  <p className='text-gray-400 italic text-sm mt-1'>No description available</p>
                )}
              </div>
            </div>

            <div className='absolute inset-0 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
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
                <p className='text-gray-400 italic'>No social links available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventVolunteers;
