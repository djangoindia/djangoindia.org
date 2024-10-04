'use client';
import Image from 'next/image';
import React from 'react';
import splitAndCapitalize from '../../utils/formatKey'

type SponsorDetails = {
  name?: string;
  logo?: string;
  type?: string;
  url?: string;
  description?: string;
};

type Sponsor = {
  sponsor_details?: SponsorDetails;
  tier?: string;
};

type SponsorLevelProps = {
  level: string;
  sponsors: SponsorDetails[];
  size: { width: number; height: number };
  hasHoverEffect: boolean;
};

type EventSponsorsProps = {
  sponsors?: Sponsor[];
};

const SponsorLevel: React.FC<SponsorLevelProps> = ({ level, sponsors, size, hasHoverEffect }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h5 className='text-xl font-semibold text-[#06038D]'>{splitAndCapitalize(level)}</h5>
      <div className='flex flex-wrap gap-12'>
        {sponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.url || '#'}
            target='_blank'
            rel='noopener noreferrer'
            style={{ width: `${size.width}px`, height: `${size.height}px` }}
            className={`relative bg-white rounded-lg shadow-sm transition-all duration-300 ${
              hasHoverEffect ? 'hover:shadow-md group overflow-hidden' : ''
            }`}
          >
            {sponsor.logo ? (
              <div
                className={`absolute inset-0 flex justify-center items-center ${
                  hasHoverEffect ? 'transition-opacity duration-300 ease-in-out group-hover:opacity-0' : ''
                } p-4`}
              >
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name || 'Sponsor'} logo`}
                  width={size.width - 20}
                  height={size.height - 20}
                  style={{height: `100%` }}
                  className='rounded-lg object-contain'
                />
              </div>
            ) : (
              <div className='absolute inset-0 flex justify-center items-center p-4'>
                <p className='text-gray-400 italic'>No logo available</p>
              </div>
            )}

            {hasHoverEffect && (
              <div className='absolute inset-0 flex flex-col justify-start p-5 gap-3 text-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
                <h6 className='text-sm font-semibold text-[#06038D] text-start'>About</h6>
                <p className='text-black font-medium break-all text-xs text-start'>
                  {sponsor.description ? sponsor.description : 'No description available'}
                </p>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

const EventSponsors: React.FC<EventSponsorsProps> = ({ sponsors = [] }) => {
  if (sponsors.length === 0) {
    return (
      <div className='flex flex-col items-left justify-left py-10'>
        <h4 className='text-2xl font-bold'>Event Sponsors</h4>
        <p className='text-gray-500 mt-4'>No sponsors are available at the moment.</p>
      </div>
    );
  }

  const sponsorsByTier = sponsors.reduce((acc: Record<string, SponsorDetails[]>, sponsor) => {
    const tier = sponsor.tier?.toLowerCase() || 'unknown';
    if (!acc[tier]) {
      acc[tier] = [];
    }
    if (sponsor.sponsor_details) {
      acc[tier].push(sponsor.sponsor_details);
    }
    return acc;
  }, {});

  const tierSizeConfig: Record<string, { width: number; height: number }> = {
    platinum: { width: 300, height: 200 },
    gold: { width: 240, height: 160 },
    silver: { width: 180, height: 120 },
  };

  const tierOrder = ['platinum', 'gold', 'silver'];
  const remainingTiers = Object.keys(sponsorsByTier).filter(
    (tier) => !tierOrder.includes(tier)
  );
  const sortedTiers = [...tierOrder, ...remainingTiers];

  return (
    <div className='flex flex-col gap-6 py-10'>
      <h4 className='text-2xl font-bold flex items-center'>Event Sponsors</h4>
      <p className='font-medium'>
      Support the Django India community and connect with a passionate, skilled audience. Join us in driving innovation and making an impact within the Django ecosystem.
      </p>
      {sortedTiers.map((tier) => (
        sponsorsByTier[tier] && (
          <SponsorLevel
            key={tier}
            level={tier.charAt(0).toUpperCase() + tier.slice(1)}
            sponsors={sponsorsByTier[tier]}
            size={tierSizeConfig[tier] || { width: 120, height: 120 }}
            hasHoverEffect={tier === 'platinum' || tier === 'gold'}
          />
        )
      ))}
    </div>
  );
};

export default EventSponsors;
