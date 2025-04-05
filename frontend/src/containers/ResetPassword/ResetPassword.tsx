'use client'

import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { Button, Input, Label } from "@/components";
import { RESET_PASSWORD_SCHEMA } from "@/constants";
import { fetchData } from "@/utils";

import type { ResetPasswordType } from "./ResetPassword.types";



const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirect = searchParams.get("redirect") || "/";

    // Retriving raw URL to handle potential HTML encoded parameters
    const url = new URL(window.location.href);

    // Replace HTML-encoded ampersands (&amp;) and other encoded characters
    const fixedSearch = url.search
        .replace(/&amp%3B/g, '&')  // Fix &amp%3B (double-encoded &)
        .replace(/&amp;/g, '&');    // Fix &amp; (HTML-encoded &)

    const params = new URLSearchParams(fixedSearch);
    const uidb64 = params.get("uidb64") || url.searchParams.get("uidb64") || "";
    const token = params.get("token") || url.searchParams.get("token") || "";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidLink, setIsValidLink] = useState(true);
    const [isValidating, setIsValidating] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordType>({
        resolver: yupResolver(RESET_PASSWORD_SCHEMA),
    });

    useEffect(() => {
        const checkAndValidateParams = () => {
            setIsValidating(true);

            let validUidb64 = uidb64;
            let validToken = token;
            
            const rawUrl = window.location.href;
            if ((!validUidb64 || !validToken) && rawUrl.includes('uidb64=') && rawUrl.includes('token=')) {
                try {
                    const uidMatch = rawUrl.match(/uidb64=([^&]+)/);
                    const tokenMatch = rawUrl.match(/token=([^&]+)/);

                    if (uidMatch && uidMatch[1]) validUidb64 = uidMatch[1];
                    if (tokenMatch && tokenMatch[1]) validToken = tokenMatch[1];
                } catch (error) {
                    console.error('Error parsing URL parameters:', error);
                }
            }

            if (!validUidb64 || !validToken) {
                enqueueSnackbar('Invalid password reset link', {
                    variant: 'error',
                });
                setIsValidLink(false);
                router.push('/');
            } else {
                setIsValidLink(true);
            }

            setIsValidating(false);
        };

        checkAndValidateParams();
    }, [uidb64, token, router]);

    const onSubmit = async (data: ResetPasswordType) => {
        try {

            if (!uidb64 || !token) {
                enqueueSnackbar('Invalid password reset link', {
                    variant: 'error',
                });
                return;
            }

            const response = await fetchData(
                `/reset-password/${uidb64}/${token}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ new_password: data.new_password }),
                }
            );

            if (response.error) {
                enqueueSnackbar(response.error.message || 'Failed to reset password', {
                    variant: 'error',
                });
            } else {
                enqueueSnackbar('Password has been reset successfully', {
                    variant: 'success',
                });

                router.push('/');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            enqueueSnackbar('Something went wrong. Please try again', {
                variant: 'error',
            });
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    if (isValidating) {
        return (
            <section className="relative flex size-full items-center justify-center overflow-hidden">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-[#06038D]">Validating reset link...</h3>
                </div>
            </section>
        );
    }

    return (
        <section className="relative flex size-full overflow-hidden">
            <div className="hidden flex-1 sm:block">
                <motion.div
                    className="h-full"
                    initial={{ x: -100 }}
                    animate={{ x: -20 }}
                    transition={{
                        type: 'spring',
                        bounce: 0.5,
                        visualDuration: 0.75,
                    }}
                >
                    <Image
                        src="/auth/TajMahal-Pixel-Art-signup.svg"
                        alt="TajMahal Signup"
                        style={{ objectFit: 'cover', borderRadius: '0 2rem 2rem 0' }}
                        fill
                    />
                </motion.div>
            </div>
            <div className="z-10 flex flex-1 items-center justify-center">
                <motion.div
                    className="w-4/5 sm:w-3/5"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{
                        type: 'spring',
                        bounce: 0.5,
                        visualDuration: 0.75,
                    }}
                >
                    <h3 className="text-5xl font-black text-[#06038D]">Reset</h3>
                    <h3 className="text-5xl font-black text-[#06038D]">Password?</h3>
                    <span className="my-4 inline-block font-semibold text-gray-600">
                        Enter your new password
                    </span>
                    <form
                        className="flex w-full flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid w-full items-center gap-1.5">
                            <Label
                                htmlFor="new_password"
                                className={`${errors.new_password ? 'text-red-500' : ''}`}
                            >
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    {...register('new_password')}
                                    type={showPassword ? "text" : "password"}
                                    id="new_password"
                                    placeholder="Enter your new password"
                                    className={`${errors.new_password ? 'text-red-500 !outline-red-500' : ''} pr-10`}
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            <p className="h-[20px] text-sm text-red-500">
                                {errors.new_password?.message ?? ' '}
                            </p>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label
                                htmlFor="confirm_password"
                                className={`${errors.confirm_password ? 'text-red-500' : ''}`}
                            >
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    {...register('confirm_password')}
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm_password"
                                    placeholder="Confirm your new password"
                                    className={`${errors.confirm_password ? 'text-red-500 !outline-red-500' : ''} pr-10`}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPassword}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            <p className="h-[20px] text-sm text-red-500">
                                {errors.confirm_password?.message ?? ' '}
                            </p>
                        </div>

                        <Button className="mt-4" type="submit">Reset Password</Button>
                    </form>
                    <div className="my-4 flex w-full flex-col gap-3 text-center">
                        <div>
                            Don&apos;t have account?{' '}
                            <Link
                                href={
                                    redirect
                                        ? `/signup?redirect=${encodeURIComponent(redirect)}`
                                        : '/signup'
                                }
                                className="text-[#06038D] hover:underline"
                            >
                                Sign Up here!
                            </Link>
                        </div>
                        <span>Or</span>
                        <Button
                            onClick={async () =>
                                await signIn('google', {
                                    callbackUrl: redirect ? redirect : '/',
                                })
                            }
                            className="flex w-full items-center gap-4 pl-0"
                        >
                            <FaGoogle size={20} />
                            Continue with Google
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Page;