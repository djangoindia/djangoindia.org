'use client'

import Image from 'next/image'
import { Button, DataCard } from '@components'
import useWidth from '@/hooks/useWidth'


const WhatIsDjango = () => {
  const width = useWidth()
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
        <div className='flex flex-row w-full h-auto relative'>
          {/* Left Text Section */}
          <div className='flex flex-col mt-20 md:mt-0 w-full md:w-1/2 p-2'>
            {/* Add your text content here */}
            <div className='flex flex-col h-full justify-center md:pl-10 gap-8 items-start'>
              <div className='h-16'>
                <div>
                  <Image
                    src='/whatIsDjango/lines.svg'
                    width={30} // Adjust the width according to your need
                    height={42} // Adjust the height according to your need
                    alt='Description of the image'
                    className='absolute mx-auto scale-90'
                  />
                  <div className='text-2xl md:text-4xl pl-8 pt-6 font-black text-[#06038D] archivo'>
                    What is Django India?
                  </div>
                </div>
              </div>
              <p className='w-full md:max-w-[600px] text-sm  md:text-2xl pl-8  text-black font-medium'>
              A vibrant community of Django developers, primarily from India. 
              It unites passionate individuals who are eager to learn, share knowledge, and collaborate 
              on innovative projects. Through our meetups, workshops, and online events, members actively 
              contribute to the growth of the Django ecosystem in India.
              </p>
              <div className='z-20 pl-8'>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='opacity-15 mt-20 md:mt-0 p-4 left-0 right-0 absolute md:relative md:w-1/2 md:opacity-100'>
            {/* Add your Image component or img tag here */}
            <div className='overflow-hidden'>
              <Image
                src='/whatIsDjango/mandala.svg'
                width={width >= 500 ? 490 : width >= 400 ? 350 :300}
                height={500}
                alt='Description of the image'
                className='object-contain mx-auto md:ml-20 scale-90 rotate'
              />
            </div>
            <Image
              src='/whatIsDjango/Logo.svg'
              width={250}
              height={104}
              alt='Description of the image'
              className='absolute z-20 top-64 left-56 object-contain scale-90 hidden md:block'
            />
          </div>
        </div>
      </section>
      <DataCard />
    </section>
  )
}

export default WhatIsDjango