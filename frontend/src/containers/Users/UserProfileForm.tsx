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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    Button
} from "@/components";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchData } from "@/utils";

import { API_ENDPOINTS, EDIT_PROFILE_FORM_SCHEMA } from "@/constants";
import { USER_PROFILE_FORM_FIELDS } from "./UserProfileForm.config";
import { UserData } from "./User";
import { getAccessToken } from '@/utils/getAccesstoken';
import type { ProfileForm } from './UserProfileForm.types';
import { enqueueSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

const isFieldRequired = (schema: yup.AnyObjectSchema, fieldName: string) => {
    try {
        const fieldSchema = schema.describe().fields[fieldName];
        return (fieldSchema as any)?.tests?.some((test: any) => test.name === "required");
    } catch {
        return false;
    }
};

const isFieldDisabled = (schema: yup.AnyObjectSchema, fieldName: string) => {
    try {
        return (schema.describe().fields[fieldName] as any)?.meta?.disabled === true;
    } catch {
        return false;
    }
};

const ProfileForm = ({ userData }: { userData: UserData }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

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
        formState: { errors, ...restFormState },
        ...rest
    } = useForm<ProfileForm>({
        resolver: yupResolver(EDIT_PROFILE_FORM_SCHEMA),
        defaultValues: {
            username: userData?.username || '',
            email: userData?.email || '',
            first_name: userData?.first_name || '',
            last_name: userData?.last_name || '',
            gender: userData?.gender || '',
            bio: userData?.bio || '',
            about: userData?.about || '',
            website: userData?.website || '',
            linkedin: userData?.linkedin || '',
            instagram: userData?.instagram || '',
            github: userData?.github || '',
            twitter: userData?.twitter || '',
            mastodon: userData?.mastodon || '',
            organization: userData?.organization || '',
            country: userData?.country || '',
            user_timezone: userData?.user_timezone || '',
        },
    });

    const onSubmit : SubmitHandler<ProfileForm> = async (data: any) => {
        
        try {
            const res = await fetchData<{ message: string }>(
                API_ENDPOINTS.profile,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                },
            );
            
            if (res.statusCode === 200) {
                console.log("res after updated",res)
                enqueueSnackbar('Profile updated successfully', { variant: 'success' });
            } else {
                // Handle nested error message object
                const errorMessages = res.error?.message;
                
                if (typeof errorMessages === 'object') {
                    Object.entries(errorMessages).forEach(([field, errors]) => {
                        if (Array.isArray(errors)) {
                            errors.forEach(error => 
                                enqueueSnackbar(`${field}: ${error}`, { variant: 'error' })
                            );
                        }
                    });
                } else {
                    enqueueSnackbar('An error occurred', { variant: 'error' });
                }
            }
        } catch (error) {
            console.error("Exception during API call:", error);
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    };

    return (
        <Card className="mx-auto space-y-6 bg-transparent border-none shadow-none w-full">
            <CardHeader className="px-0">
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <Form
                    register={register}
                    control={control}
                    reset={reset}
                    formState={{ errors, ...restFormState }}
                    handleSubmit={handleSubmit}
                    {...rest}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {USER_PROFILE_FORM_FIELDS.map((item, i) =>
                            Array.isArray(item) ? (
                                <div className="flex w-full justify-between gap-5" key={`field-group-${i}`}>
                                    {item.map(({ name, label, placeholder, type, options }) => {
                                        const required = isFieldRequired(EDIT_PROFILE_FORM_SCHEMA, name);
                                        const disabled = isFieldDisabled(EDIT_PROFILE_FORM_SCHEMA, name);

                                        return (
                                            <div className="grid w-full items-center gap-1.5" key={name}>
                                                <FormField
                                                    control={control}
                                                    name={name}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                {type === "checkbox" ? (
                                                                    <div className="flex items-center gap-0">
                                                                        <FormControl>
                                                                            <Input type="checkbox" onChange={field.onChange} disabled={disabled} value={field.value ?? undefined} />
                                                                        </FormControl>
                                                                        <FormLabel className="mb-0">
                                                                            {label}
                                                                        </FormLabel>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <FormLabel>
                                                                            {label} {required && <span className="text-red-500">*</span>}
                                                                        </FormLabel>
                                                                        {type === "select" ? (
                                                                            <Select
                                                                                onValueChange={field.onChange}
                                                                                defaultValue={String(field.value)}
                                                                                disabled={disabled}
                                                                                value={field.value ?? undefined}
                                                                            >
                                                                                <FormControl>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue placeholder={placeholder} />
                                                                                    </SelectTrigger>
                                                                                </FormControl>
                                                                                <SelectContent>
                                                                                    {options.map(({ label, value }) => (
                                                                                        <SelectItem key={value} value={value}>
                                                                                            {label}
                                                                                        </SelectItem>
                                                                                    ))}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        ) : (
                                                                            <FormControl>
                                                                                {type === "textarea" ? (
                                                                                    <Textarea
                                                                                        {...field}
                                                                                        rows={10}
                                                                                        placeholder={placeholder}
                                                                                        onChange={field.onChange}
                                                                                        disabled={disabled}
                                                                                        value={field.value ?? undefined}
                                                                                    />
                                                                                ) : (
                                                                                    <Input
                                                                                        {...field}
                                                                                        type={type}
                                                                                        placeholder={placeholder}
                                                                                        onChange={field.onChange}
                                                                                        disabled={disabled}
                                                                                        value={field.value ?? undefined}
                                                                                    />
                                                                                )}
                                                                            </FormControl>
                                                                        )}
                                                                    </>
                                                                )}
                                                                <FormMessage>{errors[name]?.message ?? " "}</FormMessage>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="grid w-full items-center gap-1.5" key={item.name}>
                                    <FormField
                                        control={control}
                                        name={item.name}
                                        render={({ field }) => {
                                            const required = isFieldRequired(EDIT_PROFILE_FORM_SCHEMA, item.name);
                                            const disabled = isFieldDisabled(EDIT_PROFILE_FORM_SCHEMA, item.name);

                                            return (
                                                <FormItem>
                                                    <FormLabel>
                                                        {item.label} {required && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    {item.type === "select" ? (
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={String(field.value)}
                                                            disabled={disabled}
                                                            value={field.value ?? undefined}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder={item.placeholder} />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {item.options.map(({ label, value }) => (
                                                                    <SelectItem key={value} value={value}>
                                                                        {label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    ) : (
                                                        <FormControl>
                                                            {item.type === "textarea" ? (
                                                                <Textarea
                                                                    {...field}
                                                                    rows={6}
                                                                    placeholder={item.placeholder}
                                                                    onChange={field.onChange}
                                                                    disabled={disabled}
                                                                    value={field.value ?? undefined}
                                                                />
                                                            ) : (
                                                                <Input
                                                                    {...field}
                                                                    type={item.type}
                                                                    placeholder={item.placeholder}
                                                                    onChange={field.onChange}
                                                                    disabled={disabled}
                                                                    value={field.value ?? undefined}
                                                                />
                                                            )}
                                                        </FormControl>
                                                    )}
                                                    <FormMessage>{errors[item.name]?.message ?? " "}</FormMessage>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                            )
                        )}
                        <CardFooter className="px-0">
                            <Button type="submit">Save</Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ProfileForm;
