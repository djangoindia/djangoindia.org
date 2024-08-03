'use client'

import Image from 'next/image'
import { Button } from '@components'

const WhatIsDjango = () => {
  return (
    <section className='w-full h-auto relative bg-[#f9f4ee]'>
      <section className="w-full h-[600px] relative bg-[url('/whatIsDjango/Curve.svg')] bg-cover bg-no-repeat">
        {/* You can add more content here if needed */}
        <Image
          src='/whatIsDjango/elipse.svg'
          width={1440}
          height={600}
          alt='hero'
          className='absolute z-10 object-cover w-full'
        ></Image>
        <div className='flex flex-row w-full h-auto'>
          {/* Left Text Section */}
          <div className='flex flex-col w-1/2 p-2'>
            {/* Add your text content here */}
            <div className='flex flex-col h-full justify-center pl-10 gap-8 items-start'>
              <div className=' h-16'>
                <div>
                  <Image
                    src='/whatisDjango/lines.svg'
                    width={30} // Adjust the width according to your need
                    height={42} // Adjust the height according to your need
                    alt='Description of the image'
                    className='absolute mx-auto scale-90'
                  />
                  <div className='text-4xl pl-8 pt-6 font-black text-[#06038D] archivo'>
                    What is Django India?
                  </div>
                </div>
              </div>
              <p className='max-w-[600px] text-2xl pl-8  text-black font-medium'>
                Community of Django enthusiasts from India chapter. Join us
                today to be part of the vibrant Django India community! Whether
                you&apos;re a seasoned developer or just starting out,
                there&apos;s something here for everyone. Let&apos;s code
                together and make amazing things happen!
              </p>
              <div className='z-20 pl-8'>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='w-1/2 p-4 relative'>
            {/* Add your Image component or img tag here */}
            <Image
              src='/whatisDjango/mandala.svg'
              width={500} // Adjust the width according to your need
              height={500} // Adjust the height according to your need
              alt='Description of the image'
              className='object-contain mx-auto scale-90 rotate'
            />
            <Image
              src='/whatisDjango/Logo.svg'
              width={300}
              height={104}
              alt='Description of the image'
              className='absolute z-20 top-64 left-56 object-contain scale-90'
            />
          </div>
        </div>
      </section>
    </section>
  )
}

export default WhatIsDjango
