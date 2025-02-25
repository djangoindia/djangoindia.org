export type ChangePasswordFormType = {
    newPassword?: string;
    confirmPassword?: string;
}

type InputField = {
    type:'password';
    options?: never;
};

export type FieldType = {
    label: string;
    placeholder: string;
    name: keyof ChangePasswordFormType;
} & InputField;