import * as React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

const RequestEmailVerify: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  const { access_token } = router.query;

  useEffect(() => {
    if (!access_token) return;

    const sendEmailVerification = async () => {
      try {
        setStatus('loading');

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/request-email-verify/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error sending verification email:', error);
        setStatus('error');
      }
    };

    sendEmailVerification();
  }, [access_token]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {status === 'loading' && <p>Sending verification email...</p>}
      {status === 'success' && <p>Verification email sent successfully!</p>}
      {status === 'error' && (
        <div>
          <p>
            There was an error sending the verification email. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestEmailVerify;
