'use client'
import React from 'react';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import account from '../../../public/account.png'

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
        <h4 className='text-2xl font-bold'>Event Volunteers</h4>
        <p className='text-gray-500 mt-4'>No volunteers are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 py-10'>
      <h4 className='text-3xl font-bold'>Event Volunteers</h4>
      <p className='font-medium text-gray-700'>
        Our volunteers are the heart of this event, working behind the scenes to make everything run seamlessly.
      </p>
      <div className='flex flex-wrap gap-8'>
        {volunteers.map((volunteer, index) => (
          <div
            key={index}
            className='relative bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg group flex items-center gap-4 p-5 w-full md:w-1/3 lg:w-1/4'
            style={{ height: '150px', overflow: 'hidden' }}
          >
            <div className='absolute inset-0 flex items-center gap-6 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 p-4'>
                <Image
                  src={volunteer.photo ? volunteer.photo: account}
                  alt={`${volunteer.name || 'Volunteer'}'s photo`}
                  width={70}
                  height={70}
                  objectFit='cover'
                  className='rounded-full border border-gray-300'
                />
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
                    <a
                      href={`mailto:${volunteer.email}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <FaEnvelope size={28} />
                    </a>
                  )}
                  {volunteer.linkedin && (
                    <a
                      href={volunteer.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <FaLinkedin size={28} />
                    </a>
                  )}
                  {volunteer.twitter && (
                    <a
                      href={volunteer.twitter}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-600 hover:text-blue-600'
                    >
                      <FaTwitter size={28} />
                    </a>
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
