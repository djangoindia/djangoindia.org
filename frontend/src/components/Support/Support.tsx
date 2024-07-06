import React from 'react';
import SignButton from '../ui/SignButton';

function Support() {
  return (
    <div className='flex flex-col lg:flex-row items-center lg:px-48 bg-green-800 justify-between py-6 px-6'>
      {/* Left side content */}
      <div className='lg:w-3/4 mb-4 lg:mb-0'>
        <p className='text-white text-center lg:text-left'>
          Support our Django India Community! Donate, volunteer, or spread the word to help us grow and empower developers across India.
        </p>
      </div>
      
      {/* Right side button */}
      <div className='w-full lg:w-1/4 flex justify-center lg:justify-end'>
        <SignButton color='black' text='Support us' tcol='white'/>
      </div>
    </div>
  );
}

export default Support;
