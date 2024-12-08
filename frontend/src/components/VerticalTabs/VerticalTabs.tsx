import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { VerticalTabsProps } from './VerticalTabs.types';

export const VerticalTabs = ({ config, activeHref }: VerticalTabsProps) => (
  <ul className='shrink grow-0 md:grow'>
    {config.map(({ id, href, label, ...rest }) => (
      <li key={id}>
        <Link
          href={href}
          className={cn(
            'flex select-none opacity-100 items-center text-center justify-center md:justify-start w-full gap-2 my-2 rounded-2xl p-2 md:p-4 hover:cursor-pointer hover:bg-gray-100 transition-all',
            {
              'bg-black text-white hover:bg-black': activeHref === href,
            },
          )}
          {...rest}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>
);
