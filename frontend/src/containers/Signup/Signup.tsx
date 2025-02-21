'use client';

import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { FaHome, FaGoogle } from "react-icons/fa";

import { Button, Input, Label } from '@/components';
import { SIGNUP_FORM_SCHEMA } from '@/constants';

import type { SignupFormType } from './Signup.types';

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: yupResolver(SIGNUP_FORM_SCHEMA),
  });

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-up/`, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.newPassword,
        confirm_password: data.confirmPassword,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const resdata = await res.json();
    if (res.status === 200) {
      router.replace(`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`);
    } else {
      enqueueSnackbar(resdata.message, { variant: 'error' });
    }
  };

  return (
    <section className='relative flex size-full overflow-hidden'>
      <Link 
        href='/home' 
        className='absolute top-4 right-4 sm:left-4 w-fit p-3 rounded-full transition-all duration-300 hover:bg-blue-100 hover:shadow-xl group z-50 pointer-events-auto'
      >
        <FaHome 
          className='text-[#06038D] text-2xl transition-transform duration-300 group-hover:scale-110' 
        />
      </Link>
      <div className='z-10 flex flex-1 items-center justify-center'>
        <motion.div
          className='w-4/5 sm:w-3/5'
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
              <Input
                {...register('newPassword', { required: true })}
                type='password'
                id='newPassword'
                placeholder='Enter new password'
                className={`${errors.newPassword ? 'text-red-500 !outline-red-500' : ''}`}
              />
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
              <Input
                {...register('confirmPassword', { required: true })}
                type='password'
                id='confirmPassword'
                placeholder='Confirm password'
                className={`${errors.confirmPassword ? 'text-red-500 !outline-red-500' : ''}`}
              />
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
              className='w-full flex items-center gap-4 pl-0'
            >
              <FaGoogle size={20} />
              Continue with Google
            </Button>
            </div>
          <div>
          </div>
        </motion.div>
      </div>
      <div className='flex-1 hidden sm:block'>
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
        className='absolute bottom-1/3 right-1/4 sm:right-1/2 z-0 size-[1400px]'
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
