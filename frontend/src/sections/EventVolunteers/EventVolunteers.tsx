'use client'
import React from 'react'
import Image from 'next/image'

type Volunteer = {
  name: string
  photo: string
  about: string | null
  email: string
  twitter: string | null
  linkedin: string | null
}

type EventVolunteersProps = {
  volunteers: Volunteer[]
}

const EventVolunteers: React.FC<EventVolunteersProps> = ({ volunteers }) => {
  return (
    <div className='flex flex-col gap-6 py-10'>
      <h4 className='text-2xl font-bold flex items-center'>Event Volunteers</h4>
      <p className='font-medium'>
        Our volunteers are the heart of this event, working behind the scenes to
        make everything run seamlessly.
      </p>
      <div className='flex flex-wrap gap-12'>
        {volunteers.map((volunteer, index) => (
          <div
            key={index}
            className='flex   items-center gap-4 px-4 py-8 bg-white rounded-2xl shadow-sm md:w-1/4 w-full'
          >
            <Image
              src={
                volunteer.photo.startsWith('http')
                  ? volunteer.photo
                  : `${process.env.NEXT_PUBLIC_BASE_URL}${volunteer.photo}`
              }
              alt={`${volunteer.name}'s photo`}
              width={100}
              height={100}
              objectFit='cover'
              className='rounded-full'
            />
            <div className='flex flex-col gap-2'>
              <h6 className='text-lg font-semibold'>{volunteer?.name}</h6>
              {volunteer.about && (
                <p className='text-gray-500'>{volunteer?.about}</p>
              )}
              <p className='text-gray-500'>{volunteer?.email}</p>
              <div className='flex gap-2 mt-2'>
                {volunteer?.linkedin && (
                  <a
                    href={volunteer?.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline'
                  >
                    LinkedIn
                  </a>
                )}
                {volunteer?.twitter && (
                  <a
                    href={volunteer?.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline'
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventVolunteers
