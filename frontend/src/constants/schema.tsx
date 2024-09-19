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
