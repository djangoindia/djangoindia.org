'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { getAccessToken } from '@/utils/getAccesstoken';


const VerifyEmailPage = async() => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const accessToken = await getAccessToken();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/email-verify/?token=${token}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (res.ok) {
          setStatus('success');
          setTimeout(() => router.replace('/users/me'), 4000);
        } else {
          throw new Error('Verification failed');
        }
      } catch (error) {
        setStatus('error');
        enqueueSnackbar('Email verification failed.', { variant: 'error' });
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center'>
      {status === 'loading' && <p>Verifying your email...</p>}
      {status === 'success' && (
        <>
          <h2 className='text-xl font-semibold'>
            Your email has been verified!
          </h2>
        </>
      )}
      {status === 'error' && (
        <p className='text-red-500'>
          Email verification failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
