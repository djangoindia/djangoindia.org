'use client'
import Image from 'next/image'
import { Button } from '@/components'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className=' py-16 px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0'>
      <div className='flex-1 flex flex-col gap-4 space-y-4'>
        <h2 className='text-3xl font-bold text-black'>
          We value our Sponsors and Partners!
        </h2>
        <p className='text-gray-900 text-lg'>
          We are grateful to our sponsors and partners for their pivotal role in
          Django India's growth. Your support helps us inspire and nurture the
          next generation of developers, creating a community where innovation
          thrives. Together, we're building a stronger, more inclusive ecosystem
          that empowers developers across India and beyond.
        </p>
        <Link
          href={process.env.NEXT_PUBLIC_SPONSOR_FORM || '#'}
          target='_blank'
        >
          <Button className='inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded-lg transition hover:bg-opacity-90'>
            Become a sponsor &rarr;
          </Button>
        </Link>
      </div>
      <div className='flex flex-1 justify-center items-center'>
        <Image
          src='/sponsors_and_partners_hero.svg'
          alt='Sponsors joining hands'
          className='rounded-lg object-cover'
          height={400}
          width={400}
        />
      </div>
    </section>
  )
}

export default HeroSection
