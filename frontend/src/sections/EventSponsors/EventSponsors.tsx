"use client";
import Image from 'next/image';
import React from 'react';

type SponsorDetails = {
  name: string;
  logo: string;
  type: string;
  url: string;
  description: string;
};

type Sponsor = {
  sponsor_details: SponsorDetails;
  tier: string;
};

type SponsorLevelProps = {
  level: string;
  sponsors: SponsorDetails[];
  size: { width: number; height: number };
};

type EventSponsorsProps = {
  sponsors: Sponsor[];
};

const SponsorLevel: React.FC<SponsorLevelProps> = ({ level, sponsors, size }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h5 className='text-base font-semibold text-[#06038D]'>{level}</h5>
      <div className='flex flex-wrap gap-12'>
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            style={{ perspective: '1000px', width: `${size.width}px`, height: `${size.height}px` }}
            className='relative'
          >
            <div
              className='relative w-full h-full text-center transition-transform duration-700'
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotateY(180deg)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotateY(0deg)')}
            >
              <div
                className='absolute w-full h-full flex justify-center items-center p-5 rounded-lg shadow-sm bg-white'
                style={{
                  backfaceVisibility: 'hidden',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  src={
                    sponsor.logo.startsWith('http')
                      ? sponsor.logo
                      : `${process.env.NEXT_PUBLIC_BASE_URL}${sponsor.logo}`
                  }
                  alt={`${sponsor.name} logo`}
                  width={size.width - 10}
                  height={size.height - 10}
                  objectFit='contain'
                  className='rounded-lg'
                />
              </div>

              <div
                className='absolute w-full h-full flex flex-col justify-center items-center rounded-lg shadow-sm bg-white px-4 py-2'
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden', 
                }}
              >
                <p className='text-gray-600 text-center mt-2 text-wrap'>
                  {sponsor.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventSponsors: React.FC<EventSponsorsProps> = ({ sponsors }) => {
  const sponsorsByTier = sponsors.reduce(
    (acc: Record<string, SponsorDetails[]>, sponsor) => {
      const tier = sponsor.tier.toLowerCase();
      if (!acc[tier]) {
        acc[tier] = [];
      }
      acc[tier].push(sponsor.sponsor_details);
      return acc;
    },
    {}
  );

  const tierSizeConfig: Record<string, { width: number; height: number }> = {
    platinum: { width: 200, height: 200 },
    gold: { width: 180, height: 180 },
    silver: { width: 140, height: 140 },
  };

  return (
    <div className='flex flex-col gap-6 py-10'>
      <h4 className='text-2xl font-bold flex items-center'>Event Sponsors</h4>
      <p className='font-medium'>
        Support our open-source community and connect with a passionate, skilled audience. Join us in driving innovation
        and making an impact.
      </p>
      {Object.entries(sponsorsByTier).map(([tier, sponsorsList]) => (
        <SponsorLevel
          key={tier}
          level={tier.charAt(0).toUpperCase() + tier.slice(1)}
          sponsors={sponsorsList}
          size={tierSizeConfig[tier] || { width: 120, height: 120 }}
        />
      ))}
    </div>
  );
};

export default EventSponsors;
