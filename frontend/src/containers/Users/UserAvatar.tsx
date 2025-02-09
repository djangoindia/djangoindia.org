'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components';

export const UserAvatar = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  return (
    <Avatar className='absolute left-10 top-2/3 size-48 border-4 border-[#F2ECE4]'>
      <AvatarImage src={avatarUrl ?? 'https://github.com/shadcn.png'} />
      <AvatarFallback>DU</AvatarFallback>
    </Avatar>
  );
};
