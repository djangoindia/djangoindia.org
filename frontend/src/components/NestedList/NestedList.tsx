'use client';

import React from 'react';

import Link from 'next/link';
import { FaChevronCircleRight } from 'react-icons/fa';

import { cn } from '@/utils/cn';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../Collapsible';

import type { NestedListProps } from './NestedList.types';

// NOTE: This component is not being used anywhere for now.
export const NestedList = ({ items }: NestedListProps) => {
  const [openState, setIsOpenState] = React.useState<Record<string, boolean>>(
    {},
  );

  return (
    <>
      {items?.map((item) => {
        if (!('children' in item)) {
          return (
            <Link
              href={`/media-library/${item.label}`}
              key={item.label}
              className='flex select-none items-center gap-2 rounded-2xl p-4	hover:cursor-pointer hover:bg-gray-100'
            >
              <FaChevronCircleRight />
              {item.label}
            </Link>
          );
        }

        if ('nestedItem' in item) {
          return (
            <Collapsible
              open={openState[item.label]}
              onOpenChange={() =>
                setIsOpenState((prev) => ({
                  ...prev,
                  [item.label]: !prev[item.label],
                }))
              }
              key={item.label}
            >
              <CollapsibleTrigger asChild>
                <Link
                  href={`/media-library/${item.href}`}
                  className='flex select-none items-center gap-2 rounded-2xl p-4	hover:cursor-pointer hover:bg-gray-100'
                >
                  <FaChevronCircleRight
                    className={cn('transition-all duration-500ms', {
                      'rotate-90': openState[item.label],
                    })}
                  />
                  {item.label}
                </Link>
              </CollapsibleTrigger>
              <CollapsibleContent className='my-1 pl-6'>
                <NestedList items={item.nestedItem} key={item.label} />
              </CollapsibleContent>
            </Collapsible>
          );
        } else {
          return (
            <Collapsible
              open={openState[item.label]}
              onOpenChange={() =>
                setIsOpenState((prev) => ({
                  ...prev,
                  [item.label]: !prev[item.label],
                }))
              }
              key={item.label}
            >
              <CollapsibleTrigger asChild>
                <Link
                  href={`/media-library/${item.href}`}
                  className='flex select-none items-center gap-2 rounded-2xl p-4 hover:cursor-pointer hover:bg-gray-100'
                >
                  <FaChevronCircleRight
                    className={cn('transition-all duration-500ms', {
                      'rotate-90': openState[item.label],
                    })}
                  />
                  {item.label}
                </Link>
              </CollapsibleTrigger>
              <CollapsibleContent className='my-1'>
                {item.children?.map(({ label, onClick }) => (
                  <li
                    onClick={onClick}
                    key={label}
                    className="relative ml-7 flex select-none items-center gap-2 rounded-2xl p-4 before:absolute before:inset-y-0 before:left-[-6px] before:h-full before:border-s-2 before:pr-2 before:content-[''] hover:cursor-pointer hover:bg-black hover:text-white"
                  >
                    {label}
                  </li>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }
      })}
    </>
  );
};
