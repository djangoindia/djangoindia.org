'use client';

import Image from 'next/image';

import { DataCard } from '@components';
import { LearnMoreDialog } from '@containers';

import useWidth from '@/hooks/useWidth';

const WhatIsDjango = () => {
  const width = useWidth();
  return (
    <section className='relative h-auto w-full overflow-hidden bg-[#f9f4ee]'>
      <section className="relative min-h-[500px] w-full bg-[url('/whatIsDjango/Curve.svg')] bg-cover bg-no-repeat md:min-h-[650px] lg:min-h-[750px]">
        <Image
          src='/whatIsDjango/elipse.svg'
          width={1440}
          height={600}
          alt='hero'
          className='absolute z-10 w-full object-cover'
        />
        <div className='relative flex size-full flex-col pt-20 md:flex-row md:pt-24 lg:pt-32'>
          {/* Left Text Section */}
          <div className='relative z-20 flex w-full flex-col p-2 md:w-1/2'>
            <div className='flex h-full flex-col items-start justify-center gap-6 md:gap-8 md:pl-5 lg:pl-10'>
              <div className='relative h-16'>
                <Image
                  src='/whatIsDjango/lines.svg'
                  width={30}
                  height={42}
                  alt='Description of the image'
                  className='absolute mx-auto scale-75 md:scale-90'
                />
                <div className='archivo pl-8 pt-6 text-2xl font-black text-[#06038D] md:text-3xl lg:text-4xl'>
                  What is Django India?
                </div>
              </div>
              <p className='w-full pl-8 text-sm font-medium text-black md:max-w-[600px] md:text-lg lg:text-2xl'>
                A vibrant community of Django developers, primarily from India.
                It unites passionate individuals who are eager to learn, share
                knowledge, and collaborate on innovative projects. Through our
                meetups, workshops, and online events, members actively
                contribute to the growth of the Django ecosystem in India.
              </p>
              <div className='z-20 pl-8'>
                <LearnMoreDialog />
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='absolute flex size-full items-center justify-center md:relative md:w-1/2 md:items-end md:justify-end'>
            <div className='relative'>
              <Image
                src='/whatIsDjango/mandala.svg'
                width={width >= 768 ? 490 : width >= 400 ? 350 : 300}
                height={500}
                alt='Description of the image'
                className='rotate scale-75 object-contain opacity-15 md:mb-10 md:mr-10 md:scale-90 md:opacity-100'
              />
              {/* Logo positioned at the center of mandala */}
              <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block'>
                <Image
                  src='/whatIsDjango/Logo.svg'
                  width={150}
                  height={62}
                  alt='Django India Logo'
                  className='scale-75 object-contain md:scale-90 lg:scale-100'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <DataCard />
    </section>
  );
};

export default WhatIsDjango;
