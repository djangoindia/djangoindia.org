import * as yup from 'yup'

export const CONTACT_US_FORM_SCHEMA = yup.object({
  first_name: yup
    .string()
    .min(2, 'Firstname must be at least 2 characters')
    .max(50, 'Firstname must be 50 characters or less')
    .required('Firstname is required'),
  last_name: yup
    .string()
    .min(2, 'Lastname must be at least 2 characters')
    .max(50, 'Lastname must be 50 characters or less')
    .required('Lastname is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  message: yup
    .string()
    .test('wordCount', 'Message must be 250 words or less', (value) => {
      const wordCount = (value: string) => {
        return value ? value.trim().split(/\s+/).length : 0
      }
      return wordCount(value || '') <= 250
    })
    .required('Message is required'),
})

export const SUBSCRIBER_FORM_SCHEMA = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
})

export const REGISTER_EVENT_FORM_SCHEMA = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  first_name: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot be more than 50 characters')
    .required('First name is required'),
  last_name: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot be more than 50 characters')
    .required('Last name is required'),
  professional_status: yup
    .string()
    .oneOf(
      ['working_professional', 'student', 'freelancer', 'other'],
      'Please select a valid professional status',
    )
    .required('Professional status is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
    .required('Gender is required'),
  organization: yup
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name cannot be more than 100 characters'),
  description: yup
    .string()
    .max(500, 'Description cannot be more than 500 characters'),
  linkedin: yup
    .string()
    .matches(
      /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
      'Please enter a valid LinkedIn URL',
    )
    .required('LinkedIn URL is required'),
  github: yup
    .string()
    .optional()
    .matches(
      /^https?:\/\/(www\.)?github\.com\/.*$/,
      'Please enter a valid GitHub URL',
    ),
  twitter: yup
    .string()
    .optional()
    .matches(
      /^https?:\/\/(www\.)?twitter\.com\/.*$/,
      'Please enter a valid Twitter URL',
  ),
  include_in_attendee_list: yup
    .bool()
    .optional()
})
