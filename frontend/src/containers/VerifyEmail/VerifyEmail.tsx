'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { Button } from '@/components';
import { APP_ROUTES } from '@/constants';
import { fetchData } from '@/utils';
import { getAccessToken } from '@/utils/getAccesstoken';

import type { PageProps } from '@/types/common';

const VerifyEmail = ({
  params: { token },
}: PageProps<never, { event: string }>) => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  const verifyEmail = useCallback(async () => {
    const accessToken = await getAccessToken();
    const res = await fetchData('/email-verify/?token=${token}', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.statusCode === 200) {
      setStatus('success');
      setTimeout(() => router.replace(APP_ROUTES.me), 3000);
    } else {
      enqueueSnackbar('Email verification failed.', { variant: 'error' });
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
    }
  }, [token, router, verifyEmail]);

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
        <div>
          <h2 className='text-3xl font-semibold'>
            Your email has been verified!
          </h2>
          <Button
            className='mt-5'
            onClick={() => router.replace(APP_ROUTES.login)}
          >
            Go to Login
          </Button>
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
