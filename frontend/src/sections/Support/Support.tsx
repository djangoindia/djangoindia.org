import React from 'react'

import { SupportUsDialog } from '@containers'

function Support() {
  return (
    <div className='flex flex-col items-center justify-between bg-green-800 p-6 lg:flex-row lg:px-48'>
      {/* Left side content */}
      <div className='mb-4 lg:mb-0 lg:w-3/4'>
        <p className='text-center text-white lg:text-left'>
          Support our Django India Community! Donate, volunteer, or spread the
          word to help us grow and empower developers across India.
        </p>
      </div>

      {/* Right side button */}
      <div className='flex w-full justify-center lg:w-1/4 lg:justify-end'>
        <SupportUsDialog />
      </div>
    </div>
  )
}

export default Support
