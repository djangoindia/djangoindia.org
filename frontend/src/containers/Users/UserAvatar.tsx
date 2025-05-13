'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components';

export const UserAvatar = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  const defaultAvatarUrl = 'https://github.com/shadcn.png';

  return (
    <Avatar
      className='absolute 
        left-[10%] top-3/4
        size-36 border-4
        border-[#F2ECE4] transition-all
        duration-300 sm:size-40 
        md:left-[10%] md:top-2/3 
        md:size-48'
    >
      <AvatarImage src={avatarUrl || defaultAvatarUrl} />
      <AvatarFallback>
        <img
          src={defaultAvatarUrl}
          alt='Default Avatar'
          className='size-full object-cover'
        />
      </AvatarFallback>
    </Avatar>
  );
};
