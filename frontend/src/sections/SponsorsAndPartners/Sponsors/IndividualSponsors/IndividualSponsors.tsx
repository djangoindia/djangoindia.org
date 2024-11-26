import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLink } from 'react-icons/ai';
interface Sponsor {
  tier: string;
  sponsor_details: {
    name: string;
    logo: string;
    description?: string;
    url?: string;
  };
}

const IndividualSponsors: React.FC<{ sponsors: Sponsor[] }> = ({
  sponsors,
}) => {
  return (
    <section className='px-6 py-16 sm:px-12 lg:px-24'>
      <h3 className='mb-8 text-xl font-semibold'>Individuals</h3>
      <div className='flex flex-wrap gap-8'>
        {sponsors?.map((sponsor, index) => (
          <div
            key={index}
            className='group relative flex h-36 w-full items-center gap-4 overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-lg md:w-1/3 lg:w-[23%]'
          >
            <div className='absolute inset-0 flex items-center gap-3 p-4 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0'>
              <div className='size-[60px] shrink-0'>
                <Image
                  src={sponsor.sponsor_details.logo ?? '/account.png'}
                  alt={sponsor?.sponsor_details?.name || 'Sponsor logo'}
                  width={60}
                  height={60}
                  className='size-full rounded-full border border-gray-300 object-cover'
                />
              </div>
              <div className='flex flex-col'>
                <h6 className='text-lg font-semibold text-gray-800'>
                  {sponsor?.sponsor_details?.name || 'Unnamed Sponsor'}
                </h6>
                <p className='mt-1 text-sm text-gray-600'>
                  {sponsor?.sponsor_details?.description ||
                    'No description available'}
                </p>
              </div>
            </div>
            {sponsor?.sponsor_details?.url && (
              <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                <Link
                  href={sponsor?.sponsor_details?.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-blue-600'
                >
                  <AiOutlineLink className='text-2xl' />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndividualSponsors;
