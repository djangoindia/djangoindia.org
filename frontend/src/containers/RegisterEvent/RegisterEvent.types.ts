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
}

type SelectField = {
  type: 'select'
  options: { label: string; value: string }[]
}

type InputField = {
  type: 'text'
  options?: never
}

export type FieldType = {
  label: string
  placeholder: string
  name: keyof RegisterEventForm
} & (SelectField | InputField)
