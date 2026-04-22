"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import FormButton from "../../components/formButton";
import { signUpFormValues } from "../types";
import FormInput from "../../components/formInput";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";




export default function SignupForm() {
    const router = useRouter();
    const { handleSubmit, register, watch, formState: { errors } } = useForm<signUpFormValues>()
    const passwordValue = watch('password')
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(data: signUpFormValues) {
        setIsLoading(true)
        setTimeout(() => {
            toast.success('Signed Up successfully!', {
                style: {
                    background: '#db4444',
                    color: 'white',
                    padding: '24px'
                }
            });
            setIsLoading(false)
            router.push('/login')
        }, 1000);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-24 flex-2 flex flex-col gap-10 [&_*]:min-w-[300px]   ">
            <h1 className="text-4xl font-bold  ">Sign up to Execlusive V2</h1>
            <p className="-mt-6">Enter your details below</p>
            <section className=" flex flex-col gap-4"   >
                <FormInput type={'name'} placeHolder={'Name'} register={register} name={'name'}   ></FormInput>
                <p className="text-red-600 h-6">{errors.name?.message}</p>
                <FormInput type={'email'} placeHolder={'E-mail'} register={register} name={'email'}   ></FormInput>
                <p className="text-red-600 h-6">{errors.email?.message}</p>
                <FormInput type={'password'} placeHolder={'Password'} register={register} name={'password'}  ></FormInput>
                <p className="text-red-600 h-6">{errors.password?.message}</p>
                <FormInput type={'password'} placeHolder={'Confirm password'} register={register} name={'confirmPassword'} password={passwordValue}  ></FormInput>
                <p className="text-red-600 h-6">{errors.confirmPassword?.message}</p>

            </section>
            <FormButton isLoading={isLoading}>Sign In</FormButton>
            <p>
                Already have an accout?
                <Link className="underline" href={"/login"}>
                    Log in
                </Link>
            </p>
        </form>
    )
}
