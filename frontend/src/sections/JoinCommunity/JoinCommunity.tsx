'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import useWidth from '@/hooks/useWidth'

import CirclesImage from '../../../public/10Circles.svg'

function Join() {
  const width = useWidth()
  return (
    <>
      <div className='relative -mb-40 flex size-full flex-col items-center justify-center md:flex-row'>
        <Image
          src={CirclesImage}
          alt='Circle Background'
          width={893}
          height={938}
          className='absolute -top-24 right-0 hidden object-contain md:block'
        />
        <div className='z-20 flex h-full w-3/4 flex-col items-center justify-center p-4 md:z-0 md:w-1/2'>
          <h1 className='mb-4 text-center text-4xl font-bold'>
            Join our community!
          </h1>
          <p className='mb-4 max-w-screen-sm text-center text-[20px] font-semibold'>
            Click the icons to follow our accounts and never miss updates on
            upcoming events, contributions, and more!
          </p>
        </div>

        <div className='relative top-[40px] md:top-0'>
          <Image
            src='/Phone2.png'
            alt='Phone Image'
            width={563}
            height={707}
            className='object-contain   '
          />
          <div className='absolute inset-1 right-0  top-0  z-30  h-fit pl-[22%]  pr-[9%]  sm:top-[30px] md:left-[72px] md:top-0 md:h-[707px]   md:pl-[10%] '>
            <div className=' md:pt-35 ml-2 grid grid-cols-4 gap-6 pt-20  md:ml-0 md:mt-8  md:gap-10'>
              <Link
                href='https://www.instagram.com/djangoindia'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/insta.svg'
                  alt='Instagram'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              <Link
                href='https://www.twitter.com/djangoindiaa'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/twitter.svg'
                  alt='Twitter'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              <Link
                href='https://www.youtube.com/@djangoindiaa'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/youtube.svg'
                  alt='YouTube'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              <Link
                href='https://discord.gg/YrmYTTBspe'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/discord.svg'
                  alt='Discord'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>
              <Link
                href='https://www.github.com/djangoindia'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/git.svg'
                  alt='GitHub'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              <Link
                href='https://www.reddit.com/r/djangoindia'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/reddit.svg'
                  alt='Reddit'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              <Link
                href='https://www.linkedin.com/company/django-india'
                target='_blank'
                passHref
              >
                <Image
                  src='/icons/linkedin.svg'
                  alt='LinkedIn'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              <Link href='https://t.me/djangoindiaa' target='_blank' passHref>
                <Image
                  src='/icons/telegram.svg'
                  alt='LinkedIn'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition hover:scale-110'
                />
              </Link>

              {/* <Link
                    href='https://www.whatsapp.com'
                    target='_blank'
                    passHref
                  >
                    <Image
                      src='/icons/whatsapp.svg'
                      alt='WhatsApp'
                      width={width > 768 ? 65 : 45}
                      height={width > 768 ? 101 : 50.5}
                      className='transition transform hover:scale-110'
                    />
                  </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Join
