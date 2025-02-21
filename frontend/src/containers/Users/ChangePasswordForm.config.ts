import { FieldType } from "./ChangePasswordForm.types";

export const CHANGE_PASSWORD_FORM_FIELDS: (FieldType)[] = [
    { name: 'newPassword', label: 'New Password', placeholder: 'Enter new password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm new password', type: 'password' },
];