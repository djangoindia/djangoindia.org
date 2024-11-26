'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface Sponsor {
  tier: string;
  sponsor_details: {
    name: string;
    logo: string;
    description?: string;
    url?: string;
  };
}

const OrganizationSponsors: React.FC<{ sponsors: Sponsor[] }> = ({
  sponsors,
}) => (
  <section className='px-6 py-16 sm:px-12 lg:px-24'>
    <div className='text-gray-800'>
      <h3 className='mb-6 text-xl font-semibold'>Organizations</h3>
      <div className='space-y-10'>
        {sponsors?.map((sponsor, index) => (
          <div
            key={index}
            className='flex flex-col items-start space-y-4 overflow-hidden rounded-lg md:flex-row md:space-x-8 md:space-y-0'
          >
            <Link
              href={sponsor.sponsor_details?.url || '#'}
              target='_blank'
              className='flex h-48 w-72 shrink-0 items-center justify-center rounded-lg bg-white p-4 transition-all duration-300 hover:shadow-lg'
            >
              <Image
                src={sponsor?.sponsor_details?.logo}
                alt={sponsor?.sponsor_details?.name || 'Sponsor logo'}
                width={288}
                height={192}
                className='object-contain'
              />
            </Link>
            <div className='flex-1'>
              <h4 className='mb-2 text-xl font-semibold text-gray-900'>
                {sponsor?.sponsor_details?.name || 'Unnamed Sponsor'}
              </h4>
              <p className='overflow-hidden text-ellipsis break-words leading-relaxed text-gray-600'>
                {sponsor?.sponsor_details?.description ||
                  'No description available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OrganizationSponsors;
