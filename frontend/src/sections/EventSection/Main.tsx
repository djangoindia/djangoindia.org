import React from 'react'
import EventCard from './EventCard'
import event1 from '../../../public/01.svg'
import event2 from '../../../public/02.svg'
import event3 from '../../../public/03.svg'

const Main: React.FC = () => {
  return (
    <div className='p-4 mb-10 md:mb-20 lg:mb-50'>
      <div className='flex flex-row mx-20 justify-between items-center mb-4'>
        <h1 className='text-[40px] text-center text-[#06038D] font-bold'>
          Upcoming Events
        </h1>
      </div>
      <div className='flex flex-col md:flex-row md:justify-center md:space-x-8'>
        <div className='w-full md:w-auto h-auto mb-4 md:mb-0'>
          <EventCard
            title='Event 1 is going to start within a week'
            date='Nov 22'
            imageSrc={event1}
            venue='Venue 1'
            time='10:00 AM - 2:00 PM'
          />
        </div>
        <div className='w-full md:w-auto h-auto mb-4 md:mb-0'>
          <EventCard
            title='Event 2 is going to start, stay tuned'
            date='Dec 5'
            imageSrc={event2}
            venue='Venue 2'
            time='11:00 AM - 3:00 PM'
          />
        </div>
        <div className='w-full md:w-auto h-auto mb-4 md:mb-0'>
          <EventCard
            title='Event 3 is going to start, stay tuned'
            date='Jan 15'
            imageSrc={event3}
            venue='Venue 3'
            time='9:00 AM - 1:00 PM'
          />
        </div>
      </div>
    </div>
  )
}

export default Main
