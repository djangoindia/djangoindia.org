'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import {
    Input,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button
} from "@/components";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchData } from "@/utils";

import { API_ENDPOINTS } from "@/constants";
import { CHANGE_PASSWORD_FORM_SCHEMA } from "@/constants/schema";
import { getAccessToken } from '@/utils/getAccesstoken';
import { enqueueSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import type { ChangePasswordFormType } from './ChangePasswordForm.types';
import { CHANGE_PASSWORD_FORM_FIELDS } from './ChangePasswordForm.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePasswordForm = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });

    useEffect(() => {
        const fetchAccessToken = async () => {
            const token = await getAccessToken();
            setAccessToken(token ?? null);
        };
        fetchAccessToken();
    }, []);

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isValid, dirtyFields, isSubmitting, ...restFormState },
        ...rest
    } = useForm<ChangePasswordFormType>({
        resolver: yupResolver(CHANGE_PASSWORD_FORM_SCHEMA),
    });

    const onSubmit: SubmitHandler<ChangePasswordFormType> = async (data) => {
        try {
            const res = await fetchData<{ message: string }>(
                API_ENDPOINTS.changePassword,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        new_password: data.newPassword,
                        confirm_password: data.confirmPassword
                    }),
                },
            );
            
            if (res.statusCode === 200) {
                enqueueSnackbar('Password changed successfully', { variant: 'success' });
                reset();
            } else {
                enqueueSnackbar('Failed to change password', { variant: 'error' });
            }
        } catch (error) {
            console.error("Exception during password change:", error);
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    };

    const togglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    }

    return (
        <Card className="mx-auto space-y-6 bg-transparent border-none shadow-none w-full">
            <CardHeader className="px-0">
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <Form
                    register={register}
                    control={control}
                    reset={reset}
                    formState={{ errors, isValid, dirtyFields, isSubmitting, ...restFormState }}
                    handleSubmit={handleSubmit}
                    {...rest}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {CHANGE_PASSWORD_FORM_FIELDS.map((field) => (
                            <div key={field.name} className="grid w-1/2 items-center gap-1.5 relative">
                                <FormField
                                    control={control}
                                    name={field.name}
                                    render={({ field: formField }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {field.label} <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type={
                                                        field.name === 'newPassword' && showPassword.newPassword
                                                        ? 
                                                        'text' : field.name === 'confirmPassword' && showPassword.confirmPassword
                                                        ? 
                                                        'text' :
                                                        field.type
                                                    }
                                                    placeholder={field.placeholder}
                                                    {...formField}
                                                />
                                            </FormControl>
                                            <Button
                                                className='absolute right-1 top-1/2 -translate-y-1/4 bg-transparent text-foreground hover:bg-transparent mt-2 w-max'
                                                onClick={(e) => {e.preventDefault(); togglePasswordVisibility(field.name)}}>
                                                {field.name === 'newPassword'
                                                    ? showPassword.newPassword
                                                        ? <FaEyeSlash size={18} />
                                                        : <FaEye size={18} />
                                                    : showPassword.confirmPassword
                                                        ? <FaEyeSlash size={18} />
                                                        : <FaEye size={18} />
                                                }
                                            </Button>
                                            {errors[field.name] && (
                                                <FormMessage>{errors[field.name]?.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <CardFooter className="px-0 pt-4">
                            <Button type="submit" >Change Password</Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ChangePasswordForm;