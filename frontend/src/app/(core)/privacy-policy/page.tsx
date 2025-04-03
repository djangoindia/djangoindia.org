'use client';

import React from 'react';

import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-12'>
      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-4xl font-bold text-primary'>Privacy Policy</h1>
        <p className='mx-auto max-w-2xl text-muted-foreground'>
          Last Updated: 2 March, 2025
        </p>
      </div>

      <div className='space-y-8 text-foreground'>
        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            1. Introduction
          </h2>
          <p className='leading-relaxed'>
            Welcome to Django India! Your privacy is important to us. This
            Privacy Policy explains how we collect, use, and protect your
            information when you visit our website (
            <Link
              href='https://www.djangoindia.org/home'
              className='text-primary hover:underline'
            >
              www.djangoindia.org/home
            </Link>
            ) and interact with our community.
          </p>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            2. Information We Collect
          </h2>
          <ul className='list-inside list-disc space-y-2'>
            <li>
              <strong>Personal Information:</strong> When you subscribe to our
              newsletter, register for events, or contact us, we may collect
              your name, email address, and any other details you provide.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar tracking
              technologies to enhance user experience and improve our website.
            </li>
          </ul>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            3. How We Use Your Information
          </h2>
          <ul className='list-inside list-disc space-y-2'>
            <li>Send updates, newsletters, and event invitations.</li>
            <li>Improve our website and community engagement.</li>
            <li>Analyze website traffic and trends.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            4. Data Sharing and Protection
          </h2>
          <ul className='list-inside list-disc space-y-2'>
            <li>We do not sell, trade, or rent your personal information.</li>
            <li>
              We may share data with service providers who help us manage our
              website and communications.
            </li>
            <li>
              We take reasonable security measures to protect your data from
              unauthorized access, disclosure, or loss.
            </li>
          </ul>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            5. Third-Party Links
          </h2>
          <p className='leading-relaxed'>
            Our website may contain links to external sites. We are not
            responsible for their privacy policies or content.
          </p>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            6. Your Rights and Choices
          </h2>
          <ul className='list-inside list-disc space-y-2'>
            <li>You can unsubscribe from our emails at any time.</li>
            <li>
              You may request access, correction, or deletion of your personal
              data by contacting us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            7. Changes to This Policy
          </h2>
          <p className='leading-relaxed'>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className='mb-4 border-b pb-2 text-2xl font-semibold'>
            8. Contact Us
          </h2>
          <p className='mb-4 leading-relaxed'>
            If you have any questions about this Privacy Policy, please contact
            us at:{' '}
            <Link href='mailto:contact@djangoindia.org'>
              <u>admin@djangoindia.org</u>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
