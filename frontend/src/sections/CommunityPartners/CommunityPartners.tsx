'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Partner = {
  name?: string; 
  logo?: string; 
  website?: string; 
};

type CommunityPartnersProps = {
  partners?: Partner[]; 
};

const CommunityPartners: React.FC<CommunityPartnersProps> = ({ partners = [] }) => {
  if (partners.length === 0) {
    return (
      <div className='flex flex-col items-left justify-left py-10'>
        <h4 className='text-2xl font-bold'>Community Partners</h4>
        <p className='text-gray-500 mt-4'>No community partners are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 py-10'>
      <h4 className='text-2xl font-bold flex items-center'>Community Partners</h4>
      <p className='font-medium text-gray-700'>
        We are proud to collaborate with our community partners who share our vision of making Django famous in India.
      </p>
      <div className='flex flex-wrap gap-12'>
        {partners.map((partner, index) => (
          <Link
            key={index}
            href={partner.website || '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='w-[180px] h-[120px] relative bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md group overflow-hidden p-4 flex flex-col items-center justify-center text-center'
          >
            {partner?.logo ? (
              <Image
                src={`/${partner.logo}`}
                alt={`${partner?.name || 'Partner'} logo`}
                width={120}
                height={100}
                className='rounded-lg mb-2 object-contain h-full'
              />
            ) : (
              <div className='flex justify-center items-center p-4'>
                <p className='text-gray-400 italic'>No logo available</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPartners;
