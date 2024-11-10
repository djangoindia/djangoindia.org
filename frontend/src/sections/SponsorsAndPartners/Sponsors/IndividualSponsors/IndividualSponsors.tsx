import React from 'react';
import Image from 'next/image';
import { AiOutlineLink } from 'react-icons/ai';
import account from "../../../../../public/account.png"


const IndividualSponsors: React.FC<{ sponsors: any[] }> = ({ sponsors }) => {
  return (
    <section className='py-16 px-6 sm:px-12 lg:px-24'>
      <h3 className='text-xl font-semibold mb-8'>Individuals</h3>
      <div className='flex flex-wrap gap-8'>
        {sponsors?.map((sponsor, index) => (
          <div key={index} className='relative bg-white rounded-2xl transition-all duration-300 hover:shadow-lg group flex items-center gap-4 p-4 w-full md:w-1/3 lg:w-[23%] h-36 overflow-hidden'>
            <div className='absolute inset-0 flex items-center gap-3 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 p-4'>
              <div className='w-[60px] h-[60px] flex-shrink-0'>
                <Image src={sponsor.sponsor_details.logo?? account} alt={sponsor?.sponsor_details?.name || 'Sponsor logo'} width={60} height={60} className='rounded-full border border-gray-300 object-cover w-full h-full' />
              </div>
              <div className='flex flex-col'>
                <h6 className='text-lg font-semibold text-gray-800'>{sponsor?.sponsor_details?.name || 'Unnamed Sponsor'}</h6>
                <p className='text-gray-600 text-sm mt-1'>{sponsor?.sponsor_details?.description || 'No description available'}</p>
              </div>
            </div>
            {sponsor?.sponsor_details?.url && (
              <div className='absolute inset-0 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
                <a
                  href={sponsor?.sponsor_details?.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-blue-600'
                >
                  <AiOutlineLink className='text-2xl' />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndividualSponsors;
