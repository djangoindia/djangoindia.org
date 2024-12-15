'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { Lightbox } from 'yet-another-react-lightbox';
import { Fullscreen } from 'yet-another-react-lightbox/plugins';

import { API_ENDPOINTS, APP_ROUTES } from '@/constants';
import { fetchData } from '@/utils';
import 'yet-another-react-lightbox/styles.css';

import type { PageProps } from '@/types/common';

type MediaFile = {
  id: number;
  image_file: string;
  image_width: number;
  image_height: number;
  image_ppoi: string;
  image_alt_text: string;
  download_file: string | null;
  download_type: string;
  _overwrite: boolean;
  created_at: string; // ISO date-time string
  updated_at: string; // ISO date-time string
  file_name: string;
  file_size: number;
  caption: string;
  copyright: string;
  folder: number;
};

type FolderResponseType = {
  id: string;
  name: string;
  slug: string;
  files: MediaFile[];
};

const Page = ({ params: { slug } }: PageProps<never, { slug: string }>) => {
  const [index, setIndex] = useState(-1);
  const router = useRouter();
  const [mediaResponse, setMediaResponse] = useState<{
    files: {
      src: string;
      width: number;
      height: number;
    }[];
    name: string;
  }>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchData<FolderResponseType>(`${API_ENDPOINTS.eventsMedia}/${slug}`)
      .then((res) => {
        if (res.data) {
          setMediaResponse({
            files: res.data?.files.map(
              ({ image_file, image_height, image_width }) => ({
                src: image_file,
                width: image_width,
                height: image_height,
              }),
            ),
            name: res.data.name,
          });
        } else {
          router.push(APP_ROUTES.gallery);
        }
      })
      .catch((error) => {
        console.error('Error fetching media:', error);
        router.push(APP_ROUTES.gallery);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, slug]);

  const Loader = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {mediaResponse?.files && (
        <RowsPhotoAlbum
          photos={mediaResponse.files}
          componentsProps={{
            wrapper: {
              className: 'rounded-lg overflow-hidden group',
            },
            image: {
              className: 'group-hover:scale-110 transition-all duration-300',
            },
            button: {
              className: 'rounded-lg overflow-hidden group h-[250px]',
            },
          }}
          onClick={({ index }) => setIndex(index)}
          render={{
            image: ({ src, alt, sizes }) => (
              <div className="relative w-full h-full bg-gray-100">
                <Image
                  src={src}
                  alt={alt ?? ''}
                  sizes={sizes}
                  fill
                  priority
                  onLoadingComplete={() => {
                    setMediaResponse(prev => prev ? {
                      ...prev,
                      files: prev.files.map(file => 
                        file.src === src ? { ...file, isLoaded: true } : file
                      )
                    } : prev);
                  }}
                  className={`
                    absolute inset-0 object-cover transition-all duration-300
                    ${mediaResponse?.files.find(f => f.src === src)?.isLoaded 
                      ? 'opacity-100' 
                      : 'opacity-0'
                    }
                    group-hover:scale-110
                  `}
                />
              </div>
            ),
          }}
        />
      )}
      <Lightbox
        slides={mediaResponse?.files}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen]}
      />
    </div>
  );
};

export default Page;