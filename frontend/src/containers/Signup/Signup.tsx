'use client';

import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { FaGoogle, FaHome , FaEye, FaEyeSlash } from 'react-icons/fa';

import { Button, Input, Label } from '@/components';
import { API_ENDPOINTS, SIGNUP_FORM_SCHEMA } from '@/constants';
import { fetchData } from '@/utils';

import type { SignupFormType } from './Signup.types';

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || undefined;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: yupResolver(SIGNUP_FORM_SCHEMA),
  });

  /**
   * Sends a verification email to the user.
   *
   * This function retrieves an access token and sends a request to the API
   * to initiate the email verification process. If the request is successful,
   * a success message is displayed. Otherwise, an error message is shown.
   *
   * @async
   * @function sendVerificationMail
   * @returns {Promise<void>} A promise that resolves when the request completes.
   */
  const sendVerificationMail = async (accessToken: string): Promise<void> => {
    console.log(accessToken);

    const res = await fetchData(API_ENDPOINTS.requestVerification, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res?.statusCode === 200) {
      enqueueSnackbar(
        'Verification email sent successfully. To login, please verify your email.',
        { variant: 'success' },
      );
    } else {
      enqueueSnackbar('Error sending verification email.', {
        variant: 'error',
      });
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);
  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    const res = await fetchData<{ access_token: string }>(
      API_ENDPOINTS.signup,
      {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.newPassword,
          confirm_password: data.confirmPassword,
          first_name: data.firstName,
          last_name: data.lastName,
        }),
      },
    );

    if (res.statusCode === 200 && res.data?.access_token) {
      await sendVerificationMail(res.data.access_token);
      router.replace(
        `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`,
      );
    } else {
      enqueueSnackbar(res.error?.message, { variant: 'error' });
    }
  };

  return (
    <section className='relative flex min-h-screen w-full overflow-auto'>
      <Link
        href='/home'
        className='group pointer-events-auto fixed top-4 left-4 z-50 w-fit rounded-full p-3 transition-all duration-300 hover:bg-blue-100 hover:shadow-xl'
      >
        <FaHome className='text-2xl text-[#06038D] transition-transform duration-300 group-hover:scale-110' />
      </Link>
      <div className='z-10 flex flex-1 items-center justify-center'>
        <motion.div
          className='w-full max-w-md px-6 sm:w-3/5 min-h-full pt-12'
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            visualDuration: 0.75,
          }}
        >
          <div className='my-4 w-full text-center'>
            I have an account,{' '}
            <Link href='/login' className='text-[#06038D] hover:underline'>
              Login here!
            </Link>
          </div>
          <h3 className='text-5xl font-black text-[#06038D]'>
            Create an account
          </h3>
          <span className='my-4 inline-block font-semibold text-gray-600'>
            Become a member
          </span>
          <form
            className='flex w-full flex-col'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='grid grid-cols-2 w-full items-center gap-1.5'>
              <div className='grid items-center gap-1.5'>
              <Label
                htmlFor='firstName'
                className={`${errors.firstName ? 'text-red-500' : ''}`}
              >
                First Name
              </Label>
              <Input
                {...register('firstName', { required: true })}
                type='text'
                id='firstName'
                placeholder='Enter your first name'
                className={`${errors.firstName ? 'text-red-500 !outline-red-500' : ''}`}
              />
              <p className='h-[20px] text-sm text-red-500'>
                {errors.firstName?.message ?? ' '}
              </p>
              </div>
              <div className='grid items-center gap-1.5'>
              <Label
                htmlFor='lastName'
                className={`${errors.lastName ? 'text-red-500' : ''}`}
              >
                Last Name
              </Label>
              <Input
                {...register('lastName', { required: true })}
                type='text'
                id='lastName'
                placeholder='Enter your last name'
                className={`${errors.lastName ? 'text-red-500 !outline-red-500' : ''}`}
              />
              <p className='h-[20px] text-sm text-red-500'>
                {errors.lastName?.message ?? ' '}
              </p>
              </div>
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label
                htmlFor='email'
                className={`${errors.email ? 'text-red-500' : ''}`}
              >
                Email
              </Label>
              <Input
                {...register('email', { required: true })}
                type='email'
                id='email'
                placeholder='Enter your email'
                className={`${errors.email ? 'text-red-500 !outline-red-500' : ''}`}
              />
              <p className='h-[20px] text-sm text-red-500'>
                {errors.email?.message ?? ' '}
              </p>
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label
                htmlFor='newPassword'
                className={`${errors.newPassword ? 'text-red-500' : ''}`}
              >
                New password
              </Label>
              <div className='relative'>
              <Input
                {...register('newPassword', { required: true })}
                type={showPassword ? 'text' : 'password'}
                id='newPassword'
                placeholder='Enter new password'
                className={`${errors.newPassword ? 'text-red-500 !outline-red-500' : ''}`}
              />
              <button 
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-3 flex items-center text-gray-600'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              <p className='h-[20px] text-sm text-red-500'>
                {errors.newPassword?.message ?? ' '}
              </p>
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label
                htmlFor='confirmPassword'
                className={`${errors.confirmPassword ? 'text-red-500' : ''}`}
              >
                Confirm Password
              </Label>
              <div className='relative'>
              <Input
                {...register('confirmPassword', { required: true })}
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                placeholder='Confirm password'
                className={`${errors.confirmPassword ? 'text-red-500 !outline-red-500' : ''}`}
              />
              <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute inset-y-0 right-3 flex items-center text-gray-600'
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              <p className='h-[20px] text-sm text-red-500'>
                {errors.confirmPassword?.message ?? ' '}
              </p>
            </div>
            <Button type='submit'>Create Account</Button>
          </form>
          <div className='my-4 flex w-full flex-col gap-3 text-center'>
            <span>Or</span>
            <Button
              onClick={async () =>
                await signIn('google', {
                  callbackUrl: redirect ? decodeURIComponent(redirect) : '/',
                })
              }
              className='flex w-full items-center gap-4 pl-0'
            >
              <FaGoogle size={20} />
              Continue with Google
            </Button>
          </div>
          <div></div>
        </motion.div>
      </div>
      <div className='hidden flex-1 sm:block'>
        <motion.div
          className='h-full'
          initial={{ x: 100 }}
          animate={{ x: 20 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            visualDuration: 0.75,
          }}
        >
          <Image
            src='/auth/TajMahal-Pixel-Art-login.svg'
            alt='TajMahal Login'
            fill
            style={{ objectFit: 'cover', borderRadius: '2rem 0 0 2rem' }}
          />
        </motion.div>
      </div>
      <motion.div
        className='fixed bottom-10 right-10 z-0 w-[800px] sm:right-1/3'
        initial={{ x: -100, y: -100 }}
        animate={{ x: -20, y: 0 }}
        transition={{
          type: 'spring',
          bounce: 0.5,
          visualDuration: 0.75,
        }}
      >
        <Image src='/auth/radial-lines.png' alt='Radial Lines' fill />
      </motion.div>
    </section>
  );
};

export default SignupForm;
