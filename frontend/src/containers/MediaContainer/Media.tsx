'use client';

import React, { type PropsWithChildren, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

import Loading from '@/app/(core)/loading';
import { Button, VerticalTabs, type VerticalTabsProps } from '@/components';
import { API_ENDPOINTS } from '@/constants';
import { cn, fetchData } from '@/utils';

type PhotoResponseType = {
  id: string;
  name: string;
  slug: string;
  children?: PhotoResponseType[];
};

const MediaContainer = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [folderStructure, setFolderStructure] = useState<PhotoResponseType[]>(
    [],
  );

  useEffect(() => {
    setIsLoading(true);
    fetchData<PhotoResponseType[]>(API_ENDPOINTS.eventsMedia).then((res) => {
      if (res.data) {
        setFolderStructure(res.data);
        setIsLoading(false);
      }
    });
  }, []);

  const getTabsConfig = (
    data: PhotoResponseType[],
  ): VerticalTabsProps['config'] => {
    if (data) {
      return data.map(({ id, name, slug }) => ({
        href: `/gallery/${slug}`,
        id,
        label: name,
      }));
    }
    return [];
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='container py-10'>
      <h2 className='mb-2 text-4xl font-bold'>Event Snapshots</h2>
      <p className='text-xl'>
        Explore the highlights from our events, where we come together to share
        knowledge and build connections.
      </p>
      {folderStructure.length ? (
        <div className='relative mt-5 flex h-[calc(100vh-256px)] w-full grow flex-col rounded-2xl bg-gray-100 shadow-xl md:flex-row'>
          <div
            className={cn(
              `h-0 md:h-full overflow-y-auto bg-white justify-center md:justify-start rounded-2xl transition-all ease-in-out duration-300 p-0 md:w-0 flex`,
              { 'h-max md:h-full md:max-h-full max-h-96 md:w-1/4 p-4': open },
            )}
          >
            {open && (
              <VerticalTabs
                activeHref={`/gallery/${params['slug']}`}
                config={getTabsConfig(folderStructure)}
              />
            )}
          </div>
          <div
            className={cn(
              'px-4 w-full overflow-y-auto transition-all ease-in-out duration-300',
              { 'md:w-3/4': open },
            )}
          >
            <div className='sticky top-0 z-10 mb-4 flex items-center justify-between gap-5 bg-gray-100 py-4'>
              <Button
                variant='ghost'
                className={cn(
                  'rotate-90 md:rotate-0 size-12 rounded-2xl bg-white transition-all duration-300 ease-in-out focus:bg-white',
                  { 'rotate-[-90deg] md:rotate-180': !open },
                )}
                onClick={() => setOpen((prev) => !prev)}
              >
                <FaChevronLeft />
              </Button>
              <h2 className='text-lg font-bold md:text-3xl'>
                {
                  getTabsConfig(folderStructure).find(({ href }) =>
                    href.toString().includes(params['slug'] as string),
                  )?.label
                }
              </h2>
            </div>
            {children}
          </div>
        </div>
      ) : (
        <>
          <div className='mx-auto my-10 w-1/5'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g
                id='SVGRepo_tracerCarrier'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001'
                  stroke='#c1cad2'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                ></path>
                <path
                  d='M22 2.00002L16 8M16 2L21.9999 7.99998'
                  stroke='#c1cad2'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                ></path>
                <path
                  d='M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 10.8717 2 9.87835 2.02008 9M12 2C7.28595 2 4.92893 2 3.46447 3.46447C3.03965 3.88929 2.73806 4.38921 2.52396 5'
                  stroke='#c1cad2'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                ></path>
              </g>
            </svg>
          </div>
          <h4 className='text-center text-4xl font-bold text-[#c1cad2]'>
            Nothing to show here yet : )
          </h4>
        </>
      )}
    </section>
  );
};

export default MediaContainer;
