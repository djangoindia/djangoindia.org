export type NonCollapsibleItemType = {
  label: string;
  onClick: () => void;
};

type CollapsibleWithClickItemType = {
  href: string;
  onClick?: never;
};

type CollapsibleWithoutClickItemType = {
  href?: never;
  onClick: () => void;
};

export type CollapsibleItemType = {
  label: string;
  children?: Array<NonCollapsibleItemType>;
  nestedItem?: Array<CollapsibleItemType>;
} & (CollapsibleWithClickItemType | CollapsibleWithoutClickItemType);

export type NestedListProps = {
  items?: Array<CollapsibleItemType | NonCollapsibleItemType>;
};
