'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { SupportUsDialog } from '@/containers'

const Navbar = () => {
  const pathname = usePathname() //current pathname
  return (
    <>
      <section className='h-full w-full relative bg-[#C1CAD2]'>
        <div className='h-20 w-full flex justify-around items-center'>
          {/* logo  */}
          <div className='flex items-center justify-center'>
            <Image
              src='/whatIsDjango/Logo.svg'
              width={121}
              height={42}
              alt='logo'
              className=' object-center'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>

          {/* menu */}
          <div className='flex font-semibold gap-16 text-black justify-center items-center'>
            <Link
              href='/home'
              className={`py-5 ${
                pathname === '/home'
                  ? 'border-b-2 border-black'
                  : 'hover:border-b-2 hover:border-black'
              }`}
            >
              Home
            </Link>
            <Link
              href='/allEvents'
              className={`py-5 ${
                pathname === '/allEvents'
                  ? 'border-b-2 border-black'
                  : 'hover:border-b-2 hover:border-black'
              }`}
            >
              Events
            </Link>
            <Link
              href='/contactUs'
              className={`py-5 ${
                pathname === '/contactUs'
                  ? 'border-b-2 border-black'
                  : 'hover:border-b-2 hover:border-black'
              }`}
            >
              Contact Us
            </Link>
          </div>
          <SupportUsDialog />
        </div>
      </section>
    </>
  )
}

export default Navbar
