export type RegisterEventForm = {
  email: string
  first_name: string
  last_name: string
  professional_status:
    | 'working_professional'
    | 'student'
    | 'freelancer'
    | 'other'
  gender: 'male' | 'female' | 'other'
  organization?: string
  description?: string
  linkedin: string
  github?: string
  twitter?: string
  include_in_attendee_list?: boolean
}

type SelectField = {
  type: 'select'
  options: { label: string; value: string }[]
}

type InputField = {
  type: 'text'
  options?: never
}

type Checkbox = {
  type: 'checkbox'
  options?: never
}

export type FieldType = {
  label: string
  placeholder: string
  name: keyof RegisterEventForm
} & (SelectField | InputField | Checkbox)
