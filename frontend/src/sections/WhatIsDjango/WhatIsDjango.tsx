'use client'

import Image from 'next/image'

import useWidth from '@/hooks/useWidth'

import { Button } from '@components'

const WhatIsDjango = (): JSX.Element => {
  const width = useWidth()
  return (
    <section className='relative h-auto w-full bg-[#f9f4ee]'>
      <section className="relative h-[600px] w-full bg-[url('/whatIsDjango/Curve.svg')] bg-cover bg-no-repeat">
        {/* You can add more content here if needed */}
        <Image
          src='/whatIsDjango/elipse.svg'
          width={1440}
          height={600}
          alt='hero'
          className='absolute z-10 w-full object-cover'
        ></Image>
        <div className='relative flex h-auto w-full flex-row'>
          {/* Left Text Section */}
          <div className='mt-20 flex w-full flex-col p-2 md:mt-0 md:w-1/2'>
            {/* Add your text content here */}
            <div className='flex h-full flex-col items-start justify-center gap-8 md:pl-10'>
              <div className='h-16'>
                <div>
                  <Image
                    src='/whatIsDjango/lines.svg'
                    width={30} // Adjust the width according to your need
                    height={42} // Adjust the height according to your need
                    alt='Description of the image'
                    className='absolute mx-auto scale-90'
                  />
                  <div className='archivo pl-8 pt-6 text-2xl font-black text-[#06038D] md:text-4xl'>
                    What is Django India?
                  </div>
                </div>
              </div>
              <p className='w-full pl-8 text-sm  font-medium text-black  md:max-w-[600px] md:text-2xl'>
              A vibrant community of Django developers, primarily from India. 
              It unites passionate individuals who are eager to learn, share knowledge, and collaborate 
              on innovative projects. Through our meetups, workshops, and online events, members actively 
              contribute to the growth of the Django ecosystem in India.
                Django India is a community of django developers, especially
                from India. It brings together a passionate community eager to
                learn, share knowledge, and collaborate on exciting projects.
                Through meetups, workshops, and online events, members actively
                contribute with an aim to grow the Django ecosystem in India.
              </p>
              <div className='z-20 pl-8'>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='absolute inset-x-0 mt-20 p-4 opacity-15 md:relative md:mt-0 md:w-1/2 md:opacity-100'>
            {/* Add your Image component or img tag here */}
            <div className='overflow-hidden'>
              <Image
                src='/whatIsDjango/mandala.svg'
                width={width >= 500 ? 490 : width >= 400 ? 350 : 300}
                height={500}
                alt='Description of the image'
                className='rotate mx-auto scale-90 object-contain md:ml-20'
              />
            </div>
            <Image
              src='/whatIsDjango/Logo.svg'
              width={250}
              height={104}
              alt='Description of the image'
              className='absolute left-56 top-64 z-20 hidden scale-90 object-contain md:block'
            />
          </div>
        </div>
      </section>
    </section>
  )
}

export default WhatIsDjango
