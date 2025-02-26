'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { APP_ROUTES } from '@/constants';
import { fetchData } from '@/utils';

import type { PageProps } from '@/types/common';

const VerifyEmail = ({
  searchParams: { token },
}: PageProps<never, { token: string }>) => {
  const interval = useRef<ReturnType<typeof setTimeout>>();

  const router = useRouter();
  const [count, setCount] = useState(5);

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  const verifyEmail = useCallback(async () => {
    const res = await fetchData(
      `/email-verify?token=${token}`,
      {
        method: 'GET',
      },
      false,
    );

    if (res.statusCode === 200) {
      setStatus('success');
      interval.current = setInterval(() => {
        if (count >= 1) {
          setCount((prev) => prev - 1);
        }
        if (count === 0) {
          router.replace(APP_ROUTES.login);
        }
      }, 1000);
    } else {
      enqueueSnackbar('Email verification failed.', { variant: 'error' });
    }
  }, [count, router, token]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [token, router, verifyEmail, count]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        bounce: 0.5,
        visualDuration: 0.75,
      }}
      className='flex h-screen w-screen flex-col items-center justify-center text-center'
    >
      {status === 'loading' && (
        <p className='font-semibold'>Verifying your email...</p>
      )}
      {status === 'success' && (
        <div className='flex flex-col items-center gap-4'>
          <svg
            className='animate-tick size-48 stroke-current text-green-500'
            viewBox='0 0 50 50'
            fill='none'
            stroke-width='5'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <circle
              cx='25'
              cy='25'
              r='22'
              className='stroke-green-500 opacity-20'
            ></circle>
            <path
              d='M15 25l7 7 12-12'
              className='stroke-green-500'
              stroke-dasharray='100'
            ></path>
          </svg>

          <h2 className='text-3xl font-semibold'>Email Verification</h2>
          <p className='font-semibold'>
            Your email is verified. Redirecting to login in...{count}
          </p>
        </div>
      )}
      {status === 'error' && (
        <p className='font-semibold text-red-500'>
          Email verification failed. Please try again.
        </p>
      )}
    </motion.div>
  );
};

export default VerifyEmail;
