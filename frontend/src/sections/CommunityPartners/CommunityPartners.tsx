'use client'
import React from 'react'
import Image from 'next/image'

type Partner = {
  name: string
  logo: string
  description: string
}

type CommunityPartnersProps = {
  partners: Partner[]
}

const CommunityPartners: React.FC<CommunityPartnersProps> = ({ partners }) => {
  return (
    <div className='flex flex-col gap-6 py-10'>
      <h4 className='text-2xl font-bold flex items-center'>
        Community Partners
      </h4>
      <p className='font-medium'>
        We are proud to collaborate with our community partners who share our
        vision of innovation and open collaboration.
      </p>
      <div className='flex flex-wrap gap-12'>
        {partners.map((partner, index) => (
          <div
            key={index}
            style={{ perspective: '1000px', width: '140px', height: '140px' }}
            className='w-52 h-64'
          >
            <div
              className='relative w-full h-full text-center transition-transform duration-700'
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'rotateY(180deg)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'rotateY(0deg)')
              }
            >
              <div
                className='absolute w-full h-full flex justify-center items-center rounded-lg shadow-sm bg-white'
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src={
                    partner.logo.startsWith('http')
                      ? partner.logo
                      : `/${partner.logo}`
                  }
                  alt={`${partner.name} logo`}
                  width={140}
                  height={140}
                  objectFit='contain'
                  className='rounded-lg'
                />
              </div>
              <div
                className='absolute w-full h-full flex flex-col justify-center items-center rounded-lg shadow-lg bg-white px-4'
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  overflow: 'hidden',
                }}
              >
                <p className='text-gray-600 text-center mt-2'>
                  {partner.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommunityPartners
