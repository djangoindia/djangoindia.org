'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import { Button } from '@components';

type Partner = {
  name?: string;
  logo?: string;
  website?: string;
};

type CommunityPartnersProps = {
  partners?: Partner[];
};

const CommunityPartners: React.FC<CommunityPartnersProps> = ({
  partners = [],
}) => {
  if (partners.length === 0) {
    return (
      <div className='items-left justify-left flex flex-col py-10'>
        <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Community Partners</h4>
          <Link
            href={process.env.NEXT_PUBLIC_COMMUNITY_PARTNER_FORM || '#'}
            target='_blank'
            passHref
          >
            <Button className='linear group ml-2 overflow-hidden transition-all'>
              <span className='linear w-0 overflow-hidden whitespace-nowrap transition-all group-hover:w-auto'>
                Become a community partner
              </span>
              <FaArrowRight className='linear ml-0 transition-all group-hover:ml-2' />
            </Button>
          </Link>
        </div>
        <p className='mt-4 text-gray-500'>
          No community partners are available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 py-10'>
      <div className='flex items-center'>
        <h4 className='text-2xl font-bold'>Community Partners</h4>
        <Link
          href={process.env.NEXT_PUBLIC_COMMUNITY_PARTNER_FORM || '#'}
          target='_blank'
          passHref
        >
          <Button className='linear group ml-2 overflow-hidden transition-all'>
            <span className='linear w-0 overflow-hidden whitespace-nowrap transition-all group-hover:w-auto'>
              Become a community partner
            </span>
            <FaArrowRight className='linear ml-0 transition-all group-hover:ml-2' />
          </Button>
        </Link>
      </div>
      <p className='font-medium text-gray-700'>
        We are proud to collaborate with our community partners who share our
        vision of making Django famous in India.
      </p>
      <div className='flex flex-wrap gap-12'>
        {partners.map((partner, index) => (
          <Link
            key={index}
            href={partner.website || '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative flex h-[120px] w-2/5 flex-col items-center justify-center overflow-hidden rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md md:w-1/3 lg:w-[22%]'
          >
            {partner?.logo ? (
              <Image
                src={partner.logo}
                alt={`${partner?.name || 'Partner'} logo`}
                width={120}
                height={100}
                className='mb-2 h-full rounded-lg object-contain'
              />
            ) : (
              <div className='flex items-center justify-center p-4'>
                <p className='italic text-gray-400'>No logo available</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPartners;
