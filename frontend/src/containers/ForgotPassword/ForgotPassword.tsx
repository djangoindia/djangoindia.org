'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaHome } from 'react-icons/fa';

import { Button, Input, Label } from '@/components';
import { FORGOT_PASSWORD_SCHEMA } from '@/constants';
import { fetchData } from '@/utils';

import type { ForgotPasswordType } from './ForgotPassword.types';
// eslint-disable-next-line no-duplicate-imports
import type { SubmitHandler } from 'react-hook-form';

const Page = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: yupResolver(FORGOT_PASSWORD_SCHEMA),
  });

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (data) => {
    try {
      const response = await fetchData('/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: data.email }),
      });

      if (response.error) {
        enqueueSnackbar(response.error.message || 'Failed to reset password', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Check your email to reset your password', {
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      enqueueSnackbar('Something went wrong. Please try again', {
        variant: 'error',
      });
    }
  };

  return (
    <section className='relative flex size-full overflow-hidden'>
      <Link
        href='/home'
        className='group pointer-events-auto absolute right-4 top-4 z-50 rounded-full p-3 transition-all duration-300 hover:bg-blue-100 hover:shadow-xl'
      >
        <FaHome className='text-2xl text-[#06038D] transition-transform duration-300 group-hover:scale-110' />
      </Link>
      <div className='hidden flex-1 sm:block'>
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
            src='/auth/TajMahal-Pixel-Art-signup.svg'
            alt='TajMahal Signup'
            style={{ objectFit: 'cover', borderRadius: '0 2rem 2rem 0' }}
            fill
          />
        </motion.div>
      </div>
      <div className='z-10 flex flex-1 items-center justify-center'>
        <motion.div
          className='w-4/5 sm:w-3/5'
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            visualDuration: 0.75,
          }}
        >
          <h3 className='text-5xl font-black text-[#06038D]'>Forgot</h3>
          <h3 className='text-5xl font-black text-[#06038D]'>Password?</h3>
          <span className='my-4 inline-block font-semibold text-gray-600'>
            Enter your email to continue
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
            <Button className='mt-4' type='submit'>
              Reset Password
            </Button>
          </form>
          <div className='my-4 flex w-full flex-col gap-3 text-center'>
            <div>
              Don’t have account?{' '}
              <Link
                href={
                  redirect
                    ? `/signup?redirect=${encodeURIComponent(redirect)}`
                    : '/signup'
                }
                className='text-[#06038D] hover:underline'
              >
                Sign Up here!
              </Link>
            </div>
            <span>Or</span>
            <Button
              onClick={async () =>
                await signIn('google', {
                  callbackUrl: redirect ? redirect : '/',
                })
              }
              className='flex w-full items-center gap-4 pl-0'
            >
              <FaGoogle size={20} />
              Continue with Google
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
