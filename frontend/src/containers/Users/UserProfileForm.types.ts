export type ProfileForm = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender?: string | null;
  bio: string;
  about: string;

  website?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  github?: string | null;
  twitter?: string | null;
  mastodon?: string | null;

  organization?: string | null;
  country?: string | null;
  user_timezone: string;
};

type SelectField = {
  type: 'select';
  options: { label: string; value: string }[];
};

type InputField = {
  type: 'text' | 'password' | 'textarea' | 'checkbox';
  options?: never;
};

export type FieldType = {
  label: string;
  placeholder: string;
  name: keyof ProfileForm;
} & (SelectField | InputField);
