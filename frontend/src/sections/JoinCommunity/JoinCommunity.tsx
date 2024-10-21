'use client'
import React from 'react'
import Link from 'next/link'
import CirclesImage from '../../../public/10Circles.svg'
import Image from 'next/image'
import useWidth from '@/hooks/useWidth'

function Join() {
  const width = useWidth()
  return (
    <>
      <div className='flex flex-col md:flex-row relative -mb-40 h-full w-full justify-center items-center'>
        <Image
          src={CirclesImage}
          alt='Circle Background'
          width={893}
          height={938}
          className='absolute right-0 -top-24 object-contain hidden md:block'
        />
        <div className='w-3/4 md:w-1/2 h-full p-4 flex flex-col justify-center items-center z-20 md:z-0'>
          <h1 className='text-4xl font-bold mb-4 text-center'>
            Join our community!
          </h1>
          <p className='text-[20px] font-semibold text-center max-w-[480px] mb-4'>
            Click the icons to follow our accounts and never miss updates on
            upcoming events, contributions, and more!
          </p>
        </div>

        <div className='relative top-[40px] md:top-0'>
          <div className='absolute -top-8 md:top-8 lg:top-36'>
            <p className='relative md:-left-12 md:bottom-0 text-[20px] font-semibold left-2 bottom-2'>
              Click here
            </p>
            <Image
              alt='Click here'
              className='rotate-13 md:rotate-0'
              src='/twistedArrow.png'
              width={90}
              height={120}
            />
          </div>
          <Image
            src='/Phone2.png'
            alt='Phone Image'
            width={563}
            height={707}
            className='object-contain   '
          />
          <div className='absolute pl-[22%] pr-[9%]  z-30  h-fit  top-0 inset-1  right-0  md:pl-[10%] sm:top-[30px] md:top-0 md:left-[72px]   md:h-[707px] '>
            <div className=' grid grid-cols-4 gap-6 pt-20 ml-2 md:gap-10  md:pt-35 md:mt-8  md:ml-0'>
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
                  className='transition transform hover:scale-110'
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
                  className='transition transform hover:scale-110'
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
                  className='transition transform hover:scale-110'
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
                  className='transition transform hover:scale-110'
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
                  className='transition transform hover:scale-110'
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
                  className='transition transform hover:scale-110'
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
                  className='transition transform hover:scale-110'
                />
              </Link>

              <Link href='https://t.me/djangoindiaa' target='_blank' passHref>
                <Image
                  src='/icons/telegram.svg'
                  alt='LinkedIn'
                  width={width > 768 ? 65 : 45}
                  height={width > 768 ? 101 : 50.5}
                  className='transition transform hover:scale-110'
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
