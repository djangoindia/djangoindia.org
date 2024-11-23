'use client';  

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface Sponsor {
  tier: string
  sponsor_details: {
    name: string
    logo: string
    description?: string
    url?: string
  }
}


const OrganizationSponsors: React.FC<{ sponsors: Sponsor[] }> = ({ sponsors }) => (
    <section className='py-16 px-6 sm:px-12 lg:px-24'>
      <div className='text-gray-800'>
        <h3 className='text-xl font-semibold mb-6'>Organizations</h3>
        <div className='space-y-10'>
          {sponsors?.map((sponsor, index) => (
            <div key={index} className='flex flex-col md:flex-row items-start rounded-lg space-y-4 md:space-y-0 md:space-x-8 overflow-hidden'>
              <Link href={sponsor.sponsor_details?.url ||'#'} target='_blank' className='flex-shrink-0 w-72 h-48 transition-all duration-300 hover:shadow-lg rounded-lg flex items-center justify-center bg-white p-4'>
                <Image 
                  src={sponsor?.sponsor_details?.logo}
                  alt={sponsor?.sponsor_details?.name || 'Sponsor logo'}
                  width={288}
                  height={192}
                  className='object-contain'
                />
              </Link>
              <div className='flex-1'>
                <h4 className='text-xl font-semibold text-gray-900 mb-2'>{sponsor?.sponsor_details?.name || 'Unnamed Sponsor'}</h4>
                <p className='text-gray-600 leading-relaxed break-words overflow-hidden overflow-ellipsis'>{sponsor?.sponsor_details?.description || 'No description available'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ); 


export default OrganizationSponsors;
