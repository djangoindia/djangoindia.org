import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { VerticalTabsProps } from './VerticalTabs.types';

export const VerticalTabs = ({ config, activeHref }: VerticalTabsProps) => (
  <ul>
    {config.map(({ id, href, label, ...rest }) => (
      <Link
        key={id}
        href={href}
        className={cn(
          'flex select-none items-center gap-2 my-2 rounded-2xl p-4 hover:cursor-pointer hover:bg-gray-100 transition-all duration-500ms',
          {
            'bg-black text-white hover:bg-black': activeHref === href,
          },
        )}
        {...rest}
      >
        {label}
      </Link>
    ))}
  </ul>
);
