import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

import { API_ENDPOINTS, SUBSCRIBER_FORM_SCHEMA } from '@constants';
import { fetchData } from '@utils';

import { Button } from '../Button';

import type { SubscriberForm } from '@/sections/Latestupdate/LatestUpdate.types';

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
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
      enqueueSnackbar(res?.error?.message, { variant: 'error' });
    }
    reset();
    onClose(); // Close the modal after form submission
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-lg rounded-lg bg-[#f9f4ee] p-8 shadow-lg'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-xl text-black'
        >
          &times;
        </button>

        <h2 className='mb-6 text-center text-2xl font-semibold text-black'>
          Subscribe to Django India and never miss an update!
        </h2>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Field */}
          <div className='relative flex items-center'>
            <FaRegUser className='absolute left-4 text-gray-500' />
            <input
              type='text'
              placeholder='Full Name'
              className={`w-full rounded-full border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.name ? 'border-red-500' : ''
              }`}
              {...register('name', { required: true })}
            />
            <p className='text-sm text-red-500'>
              {errors.name?.message ?? ' '}
            </p>
          </div>

          {/* Email Field */}
          <div className='relative flex items-center'>
            <MdOutlineEmail className='absolute left-4 text-gray-500' />
            <input
              type='email'
              placeholder='Email'
              className={`w-full rounded-full border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.email ? 'border-red-500' : ''
              }`}
              {...register('email', { required: true })}
            />
            <p className='text-sm text-red-500'>
              {errors.email?.message ?? ' '}
            </p>
          </div>

          {/* Submit Button */}
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
