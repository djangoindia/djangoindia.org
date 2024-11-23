import React from 'react'
import { Button } from '@/components'
import { Hero, PartnerCommunities, IndividualSponsors, OrganizationSponsors } from '@/sections/SponsorsAndPartners';
import Link from 'next/link'

interface Sponsor {
  tier: string
  sponsor_details: {
    name: string
    logo: string
    description?: string
  }
}

interface Partner {
  name: string
  logo: string
  website: string
  description: string
}

interface PageData {
  sponsors: Sponsor[]
  partners: Partner[]
}

const Page = async () => {
  let data: PageData | null = null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sponsors-and-partners/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn('API responded with an error:', response.status, response.statusText);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    data = await response.json();
  } catch (err: unknown) {
    console.error('Error fetching data:', err);
    throw new Error(err.message || 'An unknown error occurred');
  }
  return (
    <>
      <Hero />
      {data?.sponsors && data.sponsors.length > 0 ? (
        <OrganizationSponsors
          sponsors={data.sponsors.filter(
            (sponsor) => sponsor?.tier === 'organization',
          )}
        />
      ) : (
        <div className='text-center py-8'>
          No organization sponsors available.
        </div>
      )}
      {data?.sponsors && !!data.sponsors.length  ? (  
        <IndividualSponsors
          sponsors={data.sponsors.filter(
            (sponsor) => sponsor?.tier === 'individual',
          )}
        />
      ) : (
        <div className='text-center py-8'>
          No individual sponsors available.
        </div>
      )}
      <div className='flex justify-center'>
        <Link
          href={process.env.NEXT_PUBLIC_SPONSOR_FORM || '#'}
          target='_blank'
        >
          <Button className='inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded-lg transition hover:bg-opacity-90'>
            Become a sponsor &rarr;
          </Button>
        </Link>
      </div>
      {data?.partners && data.partners.length > 0 ? (
        <PartnerCommunities partners={data.partners} />
      ) : (
        <div className='text-center py-8'>
          No partner communities available.
        </div>
      )}
    </>
  )
}

export default Page
