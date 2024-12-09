import type { LinkProps } from 'next/link';

type TabType = LinkProps & {
  id: string;
  label: string;
};

export type VerticalTabsProps = {
  config: TabType[];
  activeHref: string;
};
