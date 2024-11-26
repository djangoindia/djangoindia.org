import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components';

interface Partner {
  name: string;
  logo: string;
  website: string;
  description: string;
}

const PartnerCommunities: React.FC<{ partners: Partner[] }> = ({
  partners,
}) => {
  return (
    <section className='px-6 py-16 sm:px-12 lg:px-24'>
      <h2 className='mb-12 text-center text-3xl font-bold text-gray-800'>
        OUR PARTNER COMMUNITIES
      </h2>
      <div className='mb-12 grid grid-cols-2 justify-items-center gap-8 md:grid-cols-4'>
        {partners?.map((partner, index) => (
          <Link
            key={index}
            href={partner.website || '#'}
            target='_blank'
            className='flex h-32 w-full items-center justify-center rounded-lg bg-white p-4 transition-all duration-300 hover:shadow-lg'
          >
            <Image
              src={partner?.logo}
              alt={partner?.name || 'Partner logo'}
              width={100}
              height={60}
              className='max-h-full max-w-full object-contain'
            />
          </Link>
        ))}
      </div>
      <div className='flex justify-center'>
        <Link
          href={process.env.NEXT_PUBLIC_PARTNER_FORM || '#'}
          target='_blank'
        >
          <Button className='inline-flex items-center rounded-lg bg-[#1e3a8a]/90 px-6 py-3 font-semibold text-white transition'>
            Become a partner
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PartnerCommunities;
