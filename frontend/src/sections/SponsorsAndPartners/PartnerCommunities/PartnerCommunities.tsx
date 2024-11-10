import React from 'react';
import Image from 'next/image';
import { Button } from '@/components';
import Link from 'next/link';
import django from "../../../../public/DJANGO.svg"

const PartnerCommunities: React.FC<{ partners: any[] }> = ({ partners }) => {
  return (
    <section className='py-16 px-6 sm:px-12 lg:px-24'>
      <h2 className='text-center text-3xl font-bold text-gray-800 mb-12'>OUR PARTNER COMMUNITIES</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center mb-12'>
        {partners?.map((partner, index) => (
          <div key={index} className='bg-white rounded-lg p-4 w-full flex items-center justify-center h-32'>
            <Image src={partner?.logo} alt={partner?.name || 'Partner logo'} width={100} height={60} className='object-contain max-w-full max-h-full' />
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
      <Link
          href={process.env.NEXT_PUBLIC_PARTNER_FORM || '#'}
          target='_blank'
        >
        <Button className='inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded-lg transition hover:bg-opacity-90'>
          Become a partner &rarr;
        </Button>
        </Link>
      </div>
    </section>
  );
};

export default PartnerCommunities;
