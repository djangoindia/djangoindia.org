export type ProfileForm = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    gender?: string | null;
    bio: string;
    about: string;

    website?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
    mastodon?: string;

    organization?: string;
    country?: string;
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