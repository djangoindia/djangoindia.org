'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@components'
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";

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
        <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Community Partners</h4>
          <Link href={process.env.COMMUNITY_PARTNER_FORM || '#'} target='_blank' passHref>
            <Button className='ml-2 group transition-all linear overflow-hidden'>
              <span className='w-0 group-hover:w-auto overflow-hidden whitespace-nowrap transition-all linear'>
                Become a community partner
              </span>
              <FaArrowRight className='ml-0 group-hover:ml-2 transition-all linear' />
            </Button>
          </Link>
        </div>
        <p className='text-gray-500 mt-4'>No community partners are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 py-10'>
      <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Community Partners</h4>
          <Link href={process.env.COMMUNITY_PARTNER_FORM || '#'} target='_blank' passHref>
            <Button className='ml-2 group transition-all linear overflow-hidden'>
              <span className='w-0 group-hover:w-auto overflow-hidden whitespace-nowrap transition-all linear'>
                Become a community partner
              </span>
              <FaArrowRight className='ml-0 group-hover:ml-2 transition-all linear' />
            </Button>
          </Link>
        </div>
      <p className='font-medium text-gray-700'>
        We are proud to collaborate with our community partners who share our vision of making Django famous in India.
      </p>
      <div className='flex flex-wrap gap-12'>
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.website || '#'}
            target='_blank'
            rel='noopener noreferrer'
            style={{ width: '180px', height: '120px' }}
            className='relative bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md group overflow-hidden p-4 flex flex-col items-center justify-center text-center'
          >
            {partner?.logo ? (
              <Image
                src={partner.logo}
                alt={`${partner?.name || 'Partner'} logo`}
                width={120}
                height={100}
                style={{height: `100%` }}
                className='rounded-lg mb-2 object-contain'
              />
            ) : (
              <div className='flex justify-center items-center p-4'>
                <p className='text-gray-400 italic'>No logo available</p>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityPartners;
