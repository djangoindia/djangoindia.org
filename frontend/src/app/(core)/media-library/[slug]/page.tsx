'use client';

import React, { useEffect, useState } from 'react';

import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { Lightbox } from 'yet-another-react-lightbox';
import { Fullscreen } from 'yet-another-react-lightbox/plugins';

import { API_ENDPOINTS } from '@/constants';
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
  const [mediaResponse, setMediaResponse] = useState<{
    files: {
      src: string;
      width: number;
      height: number;
    }[];
    name: string;
  }>();

  useEffect(() => {
    fetchData<FolderResponseType>(`${API_ENDPOINTS.eventsMedia}/${slug}`).then(
      (res) => {
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
        }
      },
    );
  }, [slug]);

  return (
    <div>
      <div className='sticky top-0 z-10 mb-4 flex items-center justify-between bg-gray-100 p-4'>
        <h2 className='text-3xl font-bold'>{mediaResponse?.name}</h2>
      </div>
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
              className: 'rounded-lg overflow-hidden group',
            },
          }}
          onClick={({ index }) => setIndex(index)}
        />
      )}
      <Lightbox
        slides={mediaResponse?.files}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen]}
      />
    </div>
  );
};

export default Page;
