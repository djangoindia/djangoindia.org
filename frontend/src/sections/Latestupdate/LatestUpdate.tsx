'use client'

import React from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import './styles.css'
import { Button } from '@/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NewsletterForm } from './LatestUpdate.types'
import { fetchData } from '@utils'
import { API_ENDPOINTS, NEWSLETTER_FORM_SCHEMA } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { enqueueSnackbar } from 'notistack'

function Update() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>({
    resolver: yupResolver(NEWSLETTER_FORM_SCHEMA),
  })

  const onSubmit: SubmitHandler<NewsletterForm> = async (data) => {
    const res = await fetchData<{ message: string }>(API_ENDPOINTS.newsletter, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (res.statusCode === 200 || res.statusCode === 201) {
      enqueueSnackbar(res?.data?.message, { variant: 'success' })
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      })
    }
    reset()
  }

  return (
    <>
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
            <form
              className='flex flex-col gap-4 p-4'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div
                  className={`flex items-center border border-gray-300 rounded-xl p-2 bg-white ${errors.name ? 'border-red-500' : ''}`}
                >
                  <FaRegUser className='text-gray-500 mr-2' />
                  <input
                    type='text'
                    id='name'
                    placeholder='Full Name'
                    className='outline-none flex-1'
                    {...register('name', { required: true })}
                  />
                </div>
                <p className='text-red-500 text-sm h-[20px]'>
                  {errors.name?.message ?? ' '}
                </p>
              </div>
              <div>
                <div
                  className={`flex items-center border border-gray-300 rounded-xl p-2 bg-white  ${errors.email ? 'border-red-500' : ''}`}
                >
                  <MdOutlineEmail className='text-gray-500 mr-2' />
                  <input
                    type='email'
                    id='email'
                    placeholder='Email'
                    className='outline-none flex-1'
                    {...register('email', { required: true })}
                  />
                </div>
                <p className='text-red-500 text-sm h-[20px]'>
                  {errors.email?.message ?? ' '}
                </p>
              </div>
              <Button className='mr-auto' type='submit'>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Update
