'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components';

const HeroSection = () => {
  return (
    <div className='flex flex-col items-center space-y-6 px-6 py-16 sm:px-12 md:flex-row md:justify-between md:space-y-0 lg:px-24'>
      <div className='flex flex-1 flex-col gap-4 space-y-4'>
        <h2 className='text-3xl font-bold text-black'>
          We value our Sponsors and Partners!
        </h2>
        <p className='text-lg text-gray-900'>
          We are grateful to our sponsors and partners for their pivotal role in
          Django India’s growth. Your support helps us inspire and nurture the
          next generation of developers, creating a community where innovation
          thrives. Together, we’re building a stronger, more inclusive ecosystem
          that empowers developers across India and beyond.
        </p>
        <Link
          href={process.env.NEXT_PUBLIC_SPONSOR_URL || process.env.NEXT_PUBLIC_SPONSOR_FORM || '#'}
          target='_blank'
        >
          <Button className='inline-flex items-center rounded-lg bg-[#1e3a8a]/90 px-6 py-3 font-semibold text-white transition'>
            Become a sponsor
          </Button>
        </Link>
      </div>
      <div className='flex flex-1 items-end justify-end'>
        <Image
          src='/sponsors_and_partners_hero.svg'
          alt='Sponsors joining hands'
          className='rounded-lg object-cover'
          height={400}
          width={600}
        />
      </div>
    </div>
  );
};

export default HeroSection;
