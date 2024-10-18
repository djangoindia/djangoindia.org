'use client'

import Image from 'next/image'
import { Button, DataCard } from '@components'
import useWidth from '@/hooks/useWidth'

const WhatIsDjango = () => {
  const width = useWidth()
  return (
    <section className='w-full h-auto relative bg-[#f9f4ee] overflow-hidden'>
      <section className="w-full min-h-[500px] md:min-h-[650px] lg:min-h-[750px] relative bg-[url('/whatIsDjango/Curve.svg')] bg-cover bg-no-repeat">
        <Image
          src='/whatIsDjango/elipse.svg'
          width={1440}
          height={600}
          alt='hero'
          className='absolute z-10 object-cover w-full'
        />
        <div className='flex flex-col md:flex-row w-full h-full relative pt-20 md:pt-24 lg:pt-32'>
          {/* Left Text Section */}
          <div className='flex flex-col w-full md:w-1/2 p-2 relative z-20'>
            <div className='flex flex-col h-full justify-center md:pl-5 lg:pl-10 gap-6 md:gap-8 items-start'>
              <div className='h-16 relative'>
                <Image
                  src='/whatIsDjango/lines.svg'
                  width={30}
                  height={42}
                  alt='Description of the image'
                  className='absolute mx-auto scale-75 md:scale-90'
                />
                <div className='text-2xl md:text-3xl lg:text-4xl pl-8 pt-6 font-black text-[#06038D] archivo'>
                  What is Django India?
                </div>
              </div>
              <p className='w-full md:max-w-[600px] text-sm md:text-lg lg:text-2xl pl-8 text-black font-medium'>
                A vibrant community of Django developers, primarily from India.
                It unites passionate individuals who are eager to learn, share
                knowledge, and collaborate on innovative projects. Through our
                meetups, workshops, and online events, members actively
                contribute to the growth of the Django ecosystem in India.
              </p>
              <div className='z-20 pl-8'>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='absolute md:relative w-full md:w-1/2 h-full flex items-center justify-center md:items-end md:justify-end'>
            <Image
              src='/whatIsDjango/mandala.svg'
              width={width >= 768 ? 490 : width >= 400 ? 350 : 300}
              height={500}
              alt='Description of the image'
              className='object-contain scale-75 md:scale-90 rotate opacity-15 md:opacity-100 md:mb-10 md:mr-10'
            />
          </div>
        </div>

        {/* Logo positioned at bottom right */}
        <div className='absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-30'>
          <Image
            src='/whatIsDjango/Logo.svg'
            width={150}
            height={62}
            alt='Django India Logo'
            className='object-contain scale-75 md:scale-90 lg:scale-100'
          />
        </div>
      </section>
      <DataCard />
    </section>
  )
}

export default WhatIsDjango
