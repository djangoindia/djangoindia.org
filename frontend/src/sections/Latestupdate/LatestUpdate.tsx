'use client';

import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

import './styles.css';
import { API_ENDPOINTS, SUBSCRIBER_FORM_SCHEMA } from '@constants';
import { fetchData } from '@utils';

import { Button } from '@/components';

import type { SubscriberForm } from './LatestUpdate.types';

function Update() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriberForm>({
    resolver: yupResolver(SUBSCRIBER_FORM_SCHEMA),
  });

  const onSubmit: SubmitHandler<SubscriberForm> = async (data) => {
    const res = await fetchData<{ message: string }>(API_ENDPOINTS.subscriber, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.statusCode === 200 || res.statusCode === 201) {
      enqueueSnackbar(res?.data?.message, { variant: 'success' });
    } else if (res.statusCode === 429) {
      enqueueSnackbar('Too many requests, Please try again after some time.', {
        variant: 'error',
      });
    } else {
      enqueueSnackbar(res?.error?.message, {
        variant: 'error',
      });
    }
    reset();
  };

  return (
    <>
      <div className="relative z-20 w-full bg-[url('/subscriber/bg.svg')] bg-cover bg-no-repeat sm:px-6 lg:px-8">
        <div className='mx-auto max-w-4xl pb-10 pt-40'>
          <div className='mb-8 text-center'>
            <h1 className='mb-2 text-3xl font-bold'>Get the latest updates</h1>
            <p className='text-lg text-gray-700'>
              Enter your email to receive early notifications about upcoming
              events, projects, newsletters and more!
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='p-4'>
              <h2 className='mb-2 text-lg font-bold'>Support</h2>
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
                  className={`flex items-center rounded-xl border border-gray-300 bg-white p-2 ${errors.name ? 'border-red-500' : ''}`}
                >
                  <FaRegUser className='mr-2 text-gray-500' />
                  <input
                    type='text'
                    id='name'
                    placeholder='Full Name'
                    className='flex-1 outline-none'
                    {...register('name', { required: true })}
                  />
                </div>
                <p className='h-[20px] text-sm text-red-500'>
                  {errors.name?.message ?? ' '}
                </p>
              </div>
              <div>
                <div
                  className={`flex items-center rounded-xl border border-gray-300 bg-white p-2  ${errors.email ? 'border-red-500' : ''}`}
                >
                  <MdOutlineEmail className='mr-2 text-gray-500' />
                  <input
                    type='email'
                    id='email'
                    placeholder='Email'
                    className='flex-1 outline-none'
                    {...register('email', { required: true })}
                  />
                </div>
                <p className='h-[20px] text-sm text-red-500'>
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
  );
}

export default Update;
