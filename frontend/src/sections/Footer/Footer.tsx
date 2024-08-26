import React from 'react'

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaReddit,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

import { APP_ROUTES } from '@/constants'

const Footer: React.FC = () => {
  return (
    <footer className='bg-black px-4 pb-8 pt-12 text-white'>
      <div className='container mx-auto flex flex-col items-center justify-between overflow-hidden px-4 lg:flex-row lg:items-start'>
        {/* <a
          href='/'
          className='block w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left'
        >
          <Image src={logo} className='w-40 mx-auto lg:mx-0' alt='logo' />
        </a> */}
        <div className='mt-6 flex w-full flex-col items-center justify-center text-sm lg:mt-0 lg:flex-row'>
          <ul className='mb-6 flex w-full list-none flex-col p-0 text-center lg:mb-0 lg:mr-4 lg:w-1/3 lg:text-left'>
            <li className='inline-block px-3 py-2 font-medium tracking-wide text-white'>
              <a href={APP_ROUTES.home}>Home</a>
            </li>
            <li>
              <a
                href={APP_ROUTES.events}
                className='inline-block px-3 py-2 text-white no-underline'
              >
                Events
              </a>
            </li>
            <li>
              <a
                href={APP_ROUTES.contactUs}
                className='inline-block px-3 py-2 text-white no-underline'
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className='mb-6 flex w-full flex-col lg:mb-0 lg:mr-4 lg:w-1/3'>
            <div className='inline-block py-2 text-center font-medium tracking-wide text-white lg:text-left'>
              Follow us:
            </div>
            <div className='mt-2 flex justify-center space-x-8 lg:justify-start'>
              <a
                className='flex items-center text-2xl no-underline'
                href='https://www.linkedin.com/company/django-india/'
              >
                <FaLinkedinIn />
              </a>
              <a
                className='flex items-center text-2xl no-underline'
                href='https://www.instagram.com/djangoindia/'
              >
                <FaInstagram />
              </a>
              <a
                className='flex items-center text-2xl no-underline'
                href='https://www.reddit.com/r/djangoindia/'
              >
                <FaReddit />
              </a>
              <a
                className='flex items-center text-2xl no-underline'
                href='https://www.twitter.com/djangoindiaa'
              >
                <FaTwitter />
              </a>
              <a
                className='flex items-center text-2xl no-underline'
                href='https://youtube.com/@djangoindiaa'
              >
                <FaYoutube />
              </a>
              <a
                className='flex items-center text-2xl no-underline'
                href='https://github.com/djangoindia'
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* <ul className='list-none p-0 flex flex-col text-center lg:text-left w-full lg:w-1/3 mt-6 lg:mt-0'>
            <li className='inline-block py-2 px-3 text-white uppercase font-medium tracking-wide'>
              Subscribe to Django India
            </li>
            <div className='flex justify-center lg:justify-start'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email address'
                className='bg-black border pl-2 pr-6 pt-2 pb-2'
              />
              <button className='border pl-4 pr-4 pt-2 pb-2'>Subscribe</button>
            </div>
          </ul> */}
        </div>
      </div>
      <div className='mt-4 border-t border-gray-800 pt-6 text-center'>
        Developed by Django-India-Team | Copyright @ 2024. All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
