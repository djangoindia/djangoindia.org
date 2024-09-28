import { FieldType } from './RegisterEvent.types'

export const REGISTER_FORM_FIELDS: (FieldType | Array<FieldType>)[] = [
  [
    {
      name: 'first_name',
      label: 'First Name',
      placeholder: 'Enter your First Name',
      type: 'text',
    },
    {
      name: 'last_name',
      label: 'Last Name',
      placeholder: 'Enter your Last Name',
      type: 'text',
    },
  ],
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'text',
  },
  [
    {
      name: 'professional_status',
      label: 'Professional Status',
      placeholder: 'Select Professional Status',
      type: 'select',
      options: [
        { label: 'Working Professional', value: 'working_professional' },
        { label: 'Student', value: 'student' },
        { label: 'Freelancer', value: 'freelancer' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'organization',
      label: 'Organization',
      placeholder: 'Enter your organization',
      type: 'text',
    },
  ],
  {
    name: 'description',
    label: 'About You',
    placeholder: 'Eg. CEO of Google',
    type: 'text',
  },
  [
    {
      name: 'gender',
      label: 'Gender',
      placeholder: 'Select gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'linkedin',
      label: 'LinkedIn URL',
      placeholder: 'Your linkedIn profile',
      type: 'text',
    },
  ],
  [
    {
      name: 'github',
      label: 'Github URL',
      placeholder: 'Your github profile',
      type: 'text',
    },
    {
      name: 'twitter',
      label: 'Twitter URL',
      placeholder: 'Your twitter profile',
      type: 'text',
    },
  ],
]
