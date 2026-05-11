import React from 'react';

import Link from 'next/link';

import { Button } from '@/components';
import { API_ENDPOINTS } from '@/constants';
import {
  Hero,
  IndividualSponsors,
  OrganizationSponsors,
  PartnerCommunities,
} from '@/sections/SponsorsAndPartners';
import { fetchData } from '@/utils';

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
  isUnavailable?: boolean;
}

const fetchSponsorsAndPartners = async (): Promise<PageData> => {
  const { data, error } = await fetchData<PageData>(
    API_ENDPOINTS.sponsorsAndPartners,
  );

  return {
    sponsors: data?.sponsors ?? [],
    partners: data?.partners ?? [],
    isUnavailable: Boolean(error),
  };
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
      {data.isUnavailable && (
        <div className='mb-12 rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center'>
          <h2 className='text-2xl font-semibold'>
            This section is temporarily unavailable due to some reason
          </h2>
          <p className='mt-2 text-zinc-600'>It will be available soon.</p>
        </div>
      )}
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
