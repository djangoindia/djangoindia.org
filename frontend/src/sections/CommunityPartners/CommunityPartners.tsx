'use client';
import React from 'react';
import Image from 'next/image';

type Partner = {
  name?: string; 
  logo?: string; 
  description?: string; 
};

type CommunityPartnersProps = {
  partners?: Partner[]; 
};

const CommunityPartners: React.FC<CommunityPartnersProps> = ({ partners = [] }) => {
  if (partners.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10'>
        <h4 className='text-2xl font-bold'>Community Partners</h4>
        <p className='text-gray-500 mt-4'>No community partners are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 py-10'>
      <h4 className='text-2xl font-bold flex items-center'>Community Partners</h4>
      <p className='font-medium text-gray-700'>
        We are proud to collaborate with our community partners who share our vision of innovation and open collaboration.
      </p>
      <div className='flex flex-wrap gap-12'>
        {partners.map((partner, index) => (
          <div
            key={index}
            style={{ width: '160px', height: '160px' }}
            className='relative bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md group overflow-hidden'
          >
            {partner?.logo ? (
              <div className='absolute inset-0 flex justify-center items-center transition-opacity duration-300 ease-in-out group-hover:opacity-0 p-4'>
                <Image
                  src={
                    partner.logo.startsWith('http')
                      ? partner.logo
                      : `/${partner.logo}`
                  }
                  alt={`${partner?.name || 'Partner'} logo`}
                  width={120}
                  height={120}
                  objectFit='contain'
                  className='rounded-lg'
                />
              </div>
            ) : (
              <div className='absolute inset-0 flex justify-center items-center p-4'>
                <p className='text-gray-400 italic'>No logo available</p>
              </div>
            )}

            <div className='absolute inset-0 flex gap-2 flex-col text-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 p-4'>
              <h6 className='text-sm font-semibold text-[#06038D] text-start w-full'>
                About
              </h6>
              <p className='text-black font-medium break-all text-xs text-start w-full'>
                {partner?.description ? partner.description : 'No description available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPartners;
