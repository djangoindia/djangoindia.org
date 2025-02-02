'use client';

import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Label } from '@/components';
import { LOGIN_FORM_SCHEMA } from '@/constants';

import type { LoginFormType } from './Login.types';

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(LOGIN_FORM_SCHEMA),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (res?.error) console.log(res.error);
    if (res?.ok) router.push('/users/me');
  };

  return (
    <section className='relative flex size-full'>
      <div className='flex-1'>
        <motion.div
          className='h-full'
          initial={{ x: -100 }}
          animate={{ x: -20 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            visualDuration: 0.75,
          }}
        >
          <Image
            src='/auth/TajMahal-Pixel-Art-Signup.png'
            alt='TajMahal Signup'
            fill
          />
        </motion.div>
      </div>
      <div className='z-10 flex flex-1 items-center justify-center'>
        <motion.div
          className='w-3/5'
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            visualDuration: 0.75,
          }}
        >
          <h3 className='text-5xl font-black text-[#06038D]'>Hey,</h3>
          <h3 className='text-5xl font-black text-[#06038D]'>Welcome back!</h3>
          <span className='my-4 inline-block font-semibold text-gray-600'>
            Enter your details to continue
          </span>
          <form
            className='flex w-full flex-col gap-2'
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
                htmlFor='password'
                className={`${errors.password ? 'text-red-500' : ''}`}
              >
                Password
              </Label>
              <Input
                {...register('password', { required: true })}
                type='password'
                id='password'
                placeholder='Enter password'
                className={`${errors.password ? 'text-red-500 !outline-red-500' : ''}`}
              />
              <p className='h-[20px] text-sm text-red-500'>
                {errors.password?.message ?? ' '}
              </p>
            </div>
            <Button type='submit'>Login</Button>
          </form>
          <div className='my-4 w-full text-center'>
            <div>
              Don’t have account?
              <Link href='/signup' className='text-[#06038D] hover:underline'>
                SignUp here!
              </Link>
            </div>
            <h5 className='my-5'>Or</h5>
            <Link href='/home'>
              <Button className='w-full'>Go To Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        className='absolute left-1/2 top-1/3 z-0 size-[1400px]'
        initial={{ x: 100, y: 100 }}
        animate={{ x: 20, y: 0 }}
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

export default Page;
