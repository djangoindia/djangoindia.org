import * as React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!router.isReady) return;

    const extractedToken = Array.isArray(token) ? token[0] : token;

    if (!extractedToken) {
      setStatus('error');
      setErrorMessage('Invalid or missing verification token.');
      return;
    }

    axios
      .get<{ message: string }>(
        `${API_BASE_URL}/email-verify/?token=${extractedToken}`,
      )
      .then((response) => {
        setStatus(response.status === 200 ? 'success' : 'error');
      })
      .catch((error) => {
        setStatus('error');
        setErrorMessage(
          error.response?.data?.message || 'Verification failed.',
        );
      });
  }, [router.isReady, token]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {status === 'loading' && <p>Verifying your email...</p>}

      {status === 'success' && (
        <p>Your email has been successfully verified! 🎉</p>
      )}

      {status === 'error' && (
        <div>
          <p>{errorMessage || 'There was an error verifying your email.'}</p>
          <button
            onClick={() => console.log('Resend email logic here')}
            style={{
              padding: '10px 15px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Resend Verification Email
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
