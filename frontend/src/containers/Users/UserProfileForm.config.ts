import { FieldType } from "./UserProfileForm.types";
import { getAllCountries, getAllTimezones } from 'countries-and-timezones';

export const USER_PROFILE_FORM_FIELDS: (FieldType | Array<FieldType>)[] = [
  [
    { name: 'username', label: 'Username', placeholder: 'Username', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'Email', type: 'text' },
  ],
  [
    { name: 'first_name', label: 'First Name', placeholder: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', placeholder: 'Last Name', type: 'text' },

  ],
  [
    { name: 'organization', label: 'Organization', placeholder: 'Organization', type: 'text' },
    {
      name: 'gender',
      label: 'Gender',
      placeholder: 'Select Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Not to specify', value: 'not_to_specify' },
      ],
    },
  ],
  { name: 'bio', label: 'Short Tagline', placeholder: 'Short Tagline', type: 'text' },
  { name: 'about', label: 'About Me', placeholder: 'About Me', type: 'textarea' },
  [
    { name: 'website', label: 'Website', placeholder: 'Website', type: 'text' },
    { name: 'linkedin', label: 'LinkedIn', placeholder: 'LinkedIn', type: 'text' },
  ],
  [
    { name: 'instagram', label: 'Instagram', placeholder: 'Instagram', type: 'text' },
    { name: 'github', label: 'GitHub', placeholder: 'GitHub', type: 'text' },
  ],
  [
    { name: 'twitter', label: 'Twitter', placeholder: 'X (Twitter)', type: 'text' },
    { name: 'mastodon', label: 'Mastodon', placeholder: 'Mastodon', type: 'text' },
  ],
  [
    {
      name: 'country', 
      label: 'Country', 
      placeholder: 'Select your country', 
      type: 'select', 
      options: Object.values(getAllCountries()).map(country => ({
        label: country.name, 
        value: country.id
      }))
    },
    {
      name: 'user_timezone', 
      label: 'Timezone', 
      placeholder: 'Select your timezone', 
      type: 'select', 
      options: Object.values(getAllTimezones()).map(timezone => ({
        label: timezone.name, 
        value: timezone.name
      }))
    },
  ],
];