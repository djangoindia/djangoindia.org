"use client";

import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Last Updated: 2 March, 2025
        </p>
      </div>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            1. Introduction
          </h2>
          <p className="leading-relaxed">
            Welcome to Django India! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website (<Link href="https://djangoindia.org" className="text-primary hover:underline">djangoindia.org</Link>) and interact with our community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Information:</strong> When you subscribe to our newsletter, register for events, or contact us, we may collect your name, email address, and any other details you provide.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance user experience and improve our website.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Send updates, newsletters, and event invitations.</li>
            <li>Improve our website and community engagement.</li>
            <li>Analyze website traffic and trends.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            4. Data Sharing and Protection
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We do not sell, trade, or rent your personal information.</li>
            <li>We may share data with service providers who help us manage our website and communications.</li>
            <li>We take reasonable security measures to protect your data from unauthorized access, disclosure, or loss.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            5. Third-Party Links
          </h2>
          <p className="leading-relaxed">
            Our website may contain links to external sites. We are not responsible for their privacy policies or content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            6. Your Rights and Choices
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You can unsubscribe from our emails at any time.</li>
            <li>You may request access, correction, or deletion of your personal data by contacting us.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            7. Changes to This Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            8. Contact Us
          </h2>
          <p className="leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us at: {" "}
            <Link href="mailto:contact@djangoindia.org">
              <u>admin@djangoindia.org</u>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;