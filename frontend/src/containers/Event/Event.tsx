import Image from 'next/image'
import React from 'react'
import event1 from '../../../public/01.svg'
import wave1 from '../../../public/wave01.png'
import wave2 from '../../../public/wave02.png'

import { Button } from '@/components'
import { CiClock1, CiLocationOn } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { MdWavingHand } from 'react-icons/md'
import { RegisterEvent } from '../RegisterEvent'

const imageSrc = event1
const title = 'Django India Opening Event'

const Event = () => {
  return (
    <div>
      <div className='container'>
        <div className='relative w-full h-96 my-12 rounded-2xl mx-auto overflow-hidden shadow-xl'>
          <Image src={imageSrc} alt={title} objectFit='cover' fill />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-6xl font-bold'>{title}</h2>
          <span>21 July 2024, 04:30 PM - 07:00PM</span>
          <span>New Delhi</span>
          <RegisterEvent />
          <div className='my-10 flex flex-col gap-2'>
            <h4 className='text-2xl font-bold'>When</h4>
            <span className='flex items-center gap-2'>
              <SlCalender />
              21 July 2024, Sunday
            </span>
            <span className='flex items-center gap-2'>
              <CiClock1 />
              04:30 PM - 07:00 PM
            </span>
            {/* TODO: Use text variant of button */}
            <Button className='w-fit'>Add to Calender</Button>
          </div>
          <div className='my-10 flex flex-col gap-2'>
            <h4 className='text-2xl font-bold'>Where</h4>
            <span className='flex items-center gap-2 max-w-lg'>
              <CiLocationOn />
              8A/33, Channa Market, Block 8A, WEA, Karol Bagh, New Delhi, Delhi,
              110005
            </span>
          </div>
          <div>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.7423818239545!2d77.23172103583059!3d28.614492913451212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1721543924487!5m2!1sen!2sin'
              width='100%'
              className='rounded-2xl w-full mx-auto shadow-xl'
              height='450'
              loading='lazy'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
          <div className='my-12 text-2xl flex flex-col gap-3'>
            <span className='flex items-center gap-2'>
              Hey Everyone <MdWavingHand className='text-amber-500' />
            </span>
            <p>
              DjangoCon 2024 is the premier gathering for Django enthusiasts,
              developers, and industry professionals. Join us for three days of
              insightful talks, hands-on workshops, and valuable networking
              opportunities. This year&#39;s conference is packed with sessions
              led by some of the brightest minds in the Django community.
            </p>
          </div>
        </div>
      </div>
      <div className='bg-orange-100	relative w-full p-12 mt-24 flex flex-col items-center gap-3 overflow-hidden'>
        <Image src={wave1} alt='wave 1' className='absolute left-0 top-0' />
        <Image src={wave2} alt='wave 2' className='absolute right-0 top-0' />
        <h5 className='text-4xl	font-bold text-blue-900 text-center'>
          RSVP for this event now!
        </h5>
        <span>Registration ends Jul 24, 2024</span>
        <span className='flex items-center gap-2'>
          <CiLocationOn />
          In Person
        </span>
        <RegisterEvent />
      </div>
    </div>
  )
}

export default Event
