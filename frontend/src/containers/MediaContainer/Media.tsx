'use client';

import React, { type PropsWithChildren, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

import { Button, VerticalTabs, type VerticalTabsProps } from '@/components';
import { API_ENDPOINTS } from '@/constants';
import { cn } from '@/lib/utils';
import { fetchData } from '@/utils';

type PhotoResponseType = {
  id: string;
  name: string;
  slug: string;
  children?: PhotoResponseType[];
};

const MediaContainer = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [folderStructure, setFolderStructure] = useState<PhotoResponseType[]>(
    [],
  );

  useEffect(() => {
    fetchData<PhotoResponseType[]>(API_ENDPOINTS.eventsMedia).then((res) => {
      if (res.data) {
        setFolderStructure(res.data);
      }
    });
  }, []);

  const getTabsConfig = (
    data: PhotoResponseType[],
  ): VerticalTabsProps['config'] => {
    if (data) {
      return data.map(({ id, name, slug }) => ({
        href: `/media-library/${slug}`,
        id,
        label: name,
      }));
    }
    return [];
  };

  return (
    <section className='container py-10'>
      <h2 className='mb-2 text-4xl font-bold'>Event Snapshots</h2>
      <p className='text-xl'>
        Explore the highlights from our events, where we come together to share
        knowledge and build connections.
      </p>
      <div className='relative mt-5 flex h-[calc(100vh-256px)] w-full grow rounded-2xl bg-gray-100 shadow-xl'>
        <Button
          variant='ghost'
          className={`absolute bottom-1/2 size-10 rounded-full bg-white shadow-md transition-all duration-500 ease-in-out ${open ? 'left-[23%]' : 'left-[-20px] rotate-180'}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <FaChevronLeft />
        </Button>
        <div
          className={cn(
            `h-full bg-white rounded-2xl transition-[width] ease-in-out duration-500 p-0 w-0 overflow-hidden`,
            { 'w-1/4 p-4': open },
          )}
        >
          <VerticalTabs
            activeHref={`/media-library/${params['slug']}`}
            config={getTabsConfig(folderStructure)}
          />
        </div>
        <div className={cn('px-4 w-full overflow-y-auto', { 'w-3/4': open })}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default MediaContainer;
