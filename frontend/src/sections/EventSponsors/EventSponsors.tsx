'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import { Button } from '@components';

import splitAndCapitalize from '../../utils/formatKey';

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

const SponsorLevel: React.FC<SponsorLevelProps> = ({
  level,
  sponsors,
  size,
  hasHoverEffect,
}) => (
  <div className='flex flex-col gap-2'>
    <h5 className='text-xl font-semibold text-[#06038D]'>
      {splitAndCapitalize(level)}
    </h5>
    <div className='flex flex-wrap gap-10'>
      {sponsors.map((sponsor, index) => (
        <Link
          key={index}
          href={sponsor.url || '#'}
          target='_blank'
          rel='noopener noreferrer'
          style={{ width: `${size.width}px`, height: `${size.height}px` }}
          className={`relative rounded-lg bg-white shadow-sm transition-all duration-300 ${
            hasHoverEffect ? 'group overflow-hidden hover:shadow-md' : ''
          }`}
        >
          {sponsor.logo ? (
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                hasHoverEffect
                  ? 'transition-opacity duration-300 ease-in-out group-hover:opacity-0'
                  : ''
              } p-4`}
            >
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name || 'Sponsor'} logo`}
                width={size.width - 20}
                height={size.height - 20}
                style={{ height: `100%` }}
                className='rounded-lg object-contain'
              />
            </div>
          ) : (
            <div className='absolute inset-0 flex items-center justify-center p-4'>
              <p className='italic text-gray-400'>No logo available</p>
            </div>
          )}

          {hasHoverEffect && (
            <div className='absolute inset-0 flex flex-col justify-start gap-3 p-5 text-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
              <h6 className='text-start text-sm font-semibold text-[#06038D]'>
                About
              </h6>
              <p className='break-all text-start text-xs font-medium text-black'>
                {sponsor.description
                  ? sponsor.description
                  : 'No description available'}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  </div>
);

const EventSponsors: React.FC<EventSponsorsProps> = ({ sponsors = [] }) => {
  if (sponsors.length === 0) {
    return (
      <div className='items-left justify-left flex flex-col py-10'>
        <div className='flex items-center'>
          <h4 className='text-2xl font-bold'>Event Sponsors</h4>
          <Link
            href={process.env.NEXT_PUBLIC_SPONSOR_FORM || '#'}
            target='_blank'
            passHref
          >
            <Button className='linear group ml-2 overflow-hidden transition-all'>
              <span className='linear w-0 overflow-hidden whitespace-nowrap transition-all group-hover:w-auto'>
                Become a sponsor
              </span>
              <FaArrowRight className='linear ml-0 transition-all group-hover:ml-2' />
            </Button>
          </Link>
        </div>
        <p className='mt-4 text-gray-500'>
          No sponsors are available at the moment.
        </p>
      </div>
    );
  }

  const sponsorsByTier = sponsors.reduce(
    (acc: Record<string, SponsorDetails[]>, sponsor) => {
      const tier = sponsor.tier?.toLowerCase() || 'unknown';
      if (!acc[tier]) {
        acc[tier] = [];
      }
      if (sponsor.sponsor_details) {
        acc[tier].push(sponsor.sponsor_details);
      }
      return acc;
    },
    {},
  );

  const tierSizeConfig: Record<string, { width: number; height: number }> = {
    platinum: { width: 300, height: 200 },
    gold: { width: 240, height: 160 },
    silver: { width: 180, height: 120 },
  };

  const tierOrder = ['platinum', 'gold', 'silver'];
  const remainingTiers = Object.keys(sponsorsByTier).filter(
    (tier) => !tierOrder.includes(tier),
  );
  const sortedTiers = [...tierOrder, ...remainingTiers];

  return (
    <div className='flex flex-col gap-6 py-10'>
      <div className='flex items-center'>
        <h4 className='text-2xl font-bold'>Event Sponsors</h4>
        <Link
          href={process.env.NEXT_PUBLIC_SPONSOR_FORM || '#'}
          target='_blank'
          passHref
        >
          <Button className='linear group ml-2 overflow-hidden transition-all'>
            <span className='linear w-0 overflow-hidden whitespace-nowrap transition-all group-hover:w-auto'>
              Become a sponsor
            </span>
            <FaArrowRight className='linear ml-0 transition-all group-hover:ml-2' />
          </Button>
        </Link>
      </div>
      <p className='font-medium'>
        Support the Django India community and connect with a passionate,
        skilled audience. Join us in driving innovation and making an impact
        within the Django ecosystem.
      </p>
      {sortedTiers.map(
        (tier) =>
          sponsorsByTier[tier] && (
            <SponsorLevel
              key={tier}
              level={tier.charAt(0).toUpperCase() + tier.slice(1)}
              sponsors={sponsorsByTier[tier]}
              size={tierSizeConfig[tier] || { width: 120, height: 120 }}
              hasHoverEffect={tier === 'platinum' || tier === 'gold'}
            />
          ),
      )}
    </div>
  );
};

export default EventSponsors;
