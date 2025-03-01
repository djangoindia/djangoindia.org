'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components';

export const UserAvatar = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  const defaultAvatarUrl = 'https://github.com/shadcn.png';
  
  return (
    <Avatar className='absolute 
        left-[10%] top-3/4
        md:left-[10%] md:top-2/3
        w-36 h-36
        sm:w-40 sm:h-40 
        md:w-48 md:h-48 
        border-4 border-[#F2ECE4]
        transition-all duration-300'>
      <AvatarImage src={avatarUrl || defaultAvatarUrl} />
      <AvatarFallback>
        <img src={defaultAvatarUrl} alt="Default Avatar" className="w-full h-full object-cover" />
      </AvatarFallback>
    </Avatar>
  );
};
