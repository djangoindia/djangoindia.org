import React from 'react';

import { useParams } from 'next/navigation';

import { VerticalTabs, type VerticalTabsProps } from '@/components';
import { cn } from '@/utils/cn';

export const Explorer = ({
  tabsConfig,
}: {
  tabsConfig: VerticalTabsProps['config'];
}) => {
  const params = useParams();

  return (
    <>
      <div
        className={cn(
          `h-full bg-white rounded-2xl transition-all ease-in-out duration-300 p-0 w-0 overflow-hidden md:flex`,
          { 'md:w-1/4 p-4': open },
        )}
      >
        <VerticalTabs
          activeHref={`/gallery/${params['slug']}`}
          config={tabsConfig}
        />
      </div>
      <div
        className={cn(
          'flex w-full overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-in-out md:hidden h-0 p-0',
          { 'min-h-fit p-4': open },
        )}
      >
        <VerticalTabs
          activeHref={`/gallery/${params['slug']}`}
          config={tabsConfig}
        />
      </div>
    </>
  );
};
