'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components';
import Modal from '@/components/Modal/modal';

import Update from '../Latestupdate/LatestUpdate';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // Effect to handle body scroll when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Disable scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }

    // Clean up when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scrolling is restored
    };
  }, [isModalOpen]);

  return (
    <section className='relative h-auto w-full bg-[#f9f4ee]'>
      <div className='relative flex w-full items-start justify-center overflow-hidden lg:h-[750px]'>
        {/* Hero images */}
        <Image
          src='/HeroRight.png'
          width={600}
          height={400}
          alt='hero'
          className='absolute -right-20 -top-24 z-0 scale-90 object-contain'
        />

        <Image
          src='/HeroLeft.png'
          width={200}
          height={200}
          alt='hero'
          className='absolute left-0 top-60 z-0 object-contain xs:h-auto md:top-40'
        />

        <div className='z-10 flex h-auto w-full max-w-screen-xl flex-col justify-center gap-8 p-10 xl:pt-16'>
          <div className='w-full justify-start md:h-40'>
            <Image
              src='/DJANGO.svg'
              width={816}
              height={164}
              alt='logo'
              className='pt-14 md:scale-100 md:pt-0'
            />
          </div>
          <div className='flex w-full flex-row items-center justify-center md:gap-8'>
            <div className='mx-auto h-full'>
              <Image
                src='/03Heroimage.svg'
                width={532}
                height={159}
                alt='logo'
                className='mx-auto hidden md:block'
              />
            </div>
            <div className='min-w-1/2 flex h-full justify-start'>
              <div className='flex flex-col justify-start gap-20'>
                <Image src='/INDIA.svg' width={532} height={159} alt='logo' />
                <div className='flex flex-col gap-10'>
                  <div className='flex flex-col items-end text-right'>
                    <div className='font-Archivo_Black archivo flex-nowrap text-4xl font-black uppercase text-[#046A38]'>
                      For the Community
                    </div>
                    <div className='font-Archivo_Black archivo text-4xl font-[800] uppercase text-[#ff641f]'>
                      by the Community
                    </div>
                  </div>
                  <div className='flex flex-col text-right md:items-end'>
                    <div className='text-black'>
                      Connecting <strong>Django</strong> developers
                    </div>
                    <div className='text-black'>
                      from India & across the globe, to
                    </div>
                    <div className='pb-2 text-black'>
                      share, learn, and grow <strong>together.</strong>
                    </div>

                    {/* CTA Button */}
                    <Button onClick={toggleModal}>Subscribe for Updates</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for CTA form */}
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Update />
        </Modal>
      )}
    </section>
  );
};

export default HeroSection;
