'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
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
          `http://localhost:8000/api/v1/email-verify/?token=${token}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer <access_token>`,
            },
          },
        );

        if (res.ok) {
          setStatus('success');
          enqueueSnackbar('Email verified successfully!', {
            variant: 'success',
          });
          setTimeout(() => router.replace('/login'), 3000);
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
