import React from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import './styles.css'
import { Button } from '@/components'

function Update() {
  return (
    <div className="w-full bg-[url('/newsletter/bg.svg')] bg-no-repeat bg-cover sm:px-6 lg:px-8 relative z-20">
      <div className='max-w-4xl pt-40 pb-10 mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Get the latest updates</h1>
          <p className='text-lg text-gray-700'>
            Enter your email to receive early notifications about upcoming
            events, projects, newsletters and more!
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='p-4'>
            <h2 className='text-lg font-bold mb-2'>Support</h2>
            <p className='flex items-center text-gray-600'>
              <MdOutlineEmail className='mr-2' />
              admin@djangoindia.org
            </p>
          </div>
          <div className='p-4'>
            <div className='flex items-center border border-gray-300 rounded-xl p-2 bg-white'>
              <FaRegUser className='text-gray-500 mr-2' />
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Full Name'
                className='outline-none flex-1'
              />
            </div>
            <div className='mt-4 flex items-center border border-gray-300 rounded-xl p-2 bg-white'>
              <MdOutlineEmail className='text-gray-500 mr-2' />
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='outline-none flex-1'
              />
            </div>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
