import React from 'react'
import {
  FaInstagram,
  FaReddit,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaGithub,
} from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className='bg-black text-white pt-12 pb-8 px-4'>
      <div className='container mx-auto px-4 overflow-hidden flex flex-col lg:flex-row justify-between items-center lg:items-start'>
        {/* <a
          href='/'
          className='block w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left'
        >
          <Image src={logo} className='w-40 mx-auto lg:mx-0' alt='logo' />
        </a> */}
        <div className='w-full flex flex-col items-center justify-center lg:flex-row text-sm mt-6 lg:mt-0'>
          <ul className='list-none p-0 flex flex-col text-center lg:text-left w-full lg:w-1/3 mb-6 lg:mb-0 lg:mr-4'>
            <li className='inline-block py-2 px-3 text-white font-medium tracking-wide'>
              <a href='/'>Home</a>
            </li>
            <li>
              <a
                href='/allEvents'
                className='inline-block py-2 px-3 text-white no-underline'
              >
                Events
              </a>
            </li>
            <li>
              <a
                href='/Contactus'
                className='inline-block py-2 px-3 text-white no-underline'
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className='flex flex-col w-full lg:w-1/3 mb-6 lg:mb-0 lg:mr-4'>
            <div className='inline-block py-2 text-white font-medium tracking-wide text-center lg:text-left'>
              Follow us:
            </div>
            <div className='flex justify-center space-x-8 lg:justify-start mt-2'>
              <a
                className='flex items-center no-underline text-2xl'
                href='https://www.linkedin.com/company/django-india/'
              >
                <FaLinkedinIn />
              </a>
              <a
                className='flex items-center no-underline text-2xl'
                href='https://www.instagram.com/djangoindia/'
              >
                <FaInstagram />
              </a>
              <a
                className='flex items-center no-underline text-2xl'
                href='https://www.reddit.com/r/djangoindia/'
              >
                <FaReddit />
              </a>
              <a
                className='flex items-center no-underline text-2xl'
                href='https://www.twitter.com/djangoindiaa'
              >
                <FaTwitter />
              </a>
              <a
                className='flex items-center no-underline text-2xl'
                href='https://youtube.com/@djangoindiaa'
              >
                <FaYoutube />
              </a>
              <a
                className='flex items-center no-underline text-2xl'
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
      <div className='mt-4 pt-6 border-t border-gray-800 text-center'>
        Developed by Django-India-Team | Copyright @ 2024. All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
