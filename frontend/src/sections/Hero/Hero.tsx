'use client'

import Image from 'next/image'
import { useState } from 'react'
import Update from '../Latestupdate/LatestUpdate'
import Modal from '@/components/Modal/modal'

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

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
          className='xs:h-auto absolute left-0 top-60 z-0 object-contain md:top-40'
        />

        <div className='z-10 flex h-auto w-full max-w-[1200px] flex-col justify-center gap-8 px-10 pb-10 pt-10 xl:pt-16'>
          <div className='md:h-40 w-full justify-start'>
            <Image
              src='/DJANGO.svg'
              width={816}
              height={164}
              alt='logo'
              className='pt-14 md:pt-0 md:scale-100'
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
                    <button
                      onClick={toggleModal}
                      className='mt-4 py-2 px-6 bg-[#046A38] text-white rounded-lg hover:bg-[#ff641f] transition-all'
                    >
                      Subscribe for Updates
                    </button>
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
  )
}

export default HeroSection
