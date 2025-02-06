import React from 'react';

import Link from 'next/link';

import { Button } from '@/components';
import {
  Hero,
  IndividualSponsors,
  OrganizationSponsors,
  PartnerCommunities,
} from '@/sections/SponsorsAndPartners';

interface Sponsor {
  tier: string;
  sponsor_details: {
    name: string;
    logo: string;
    description?: string;
  };
}

interface Partner {
  name: string;
  logo: string;
  website: string;
  description: string;
}

interface PageData {
  sponsors: Sponsor[];
  partners: Partner[];
}

const fetchSponsorsAndPartners = async (): Promise<PageData> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_URL}/sponsors-and-partners/`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(
        'API responded with an error:',
        response.status,
        response.statusText,
      );
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching sponsors and partners:', error);
    return { sponsors: [], partners: [] };
  }
};

const Page = async () => {
  const data = await fetchSponsorsAndPartners();
  const OrganizationSponsorsList =
    data.sponsors.filter((sponsor) => sponsor?.tier === 'organization') || [];
  const IndividualSponsorsList =
    data.sponsors.filter((sponsor) => sponsor?.tier === 'individual') || [];
  const ShowOurSponsor =
    OrganizationSponsorsList.length > 0 || IndividualSponsorsList.length > 0;
  return (
    <section className='container'>
      <Hero />
      {ShowOurSponsor && (
        <h2 className='mb-12 text-center text-3xl font-bold text-gray-800'>
          OUR SPONSORS
        </h2>
      )}
      {OrganizationSponsorsList.length > 0 && (
        <OrganizationSponsors sponsors={OrganizationSponsorsList} />
      )}
      {IndividualSponsorsList.length > 0 && (
        <IndividualSponsors sponsors={IndividualSponsorsList} />
      )}
      {data.sponsors && data.sponsors.length > 0 && (
        <div className='flex justify-center'>
          <Link
            href={
              process.env.NEXT_PUBLIC_SPONSOR_URL ||
              process.env.NEXT_PUBLIC_SPONSOR_FORM ||
              '#'
            }
            target='_blank'
          >
            <Button className='mb-5 inline-flex items-center rounded-lg bg-[#1e3a8a] px-6 py-3 font-semibold text-white transition'>
              Become a sponsor
            </Button>
          </Link>
        </div>
      )}
      {data.partners && data.partners.length > 0 && (
        <PartnerCommunities partners={data.partners} />
      )}
    </section>
  );
};

export default Page;
