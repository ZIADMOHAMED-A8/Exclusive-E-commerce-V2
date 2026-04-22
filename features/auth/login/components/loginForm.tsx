"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import FormButton from "../../components/formButton";
import type { LoginFormValues } from "../types";
import UseLoginAction from "../useLoginAction";
import FormInput from "../../components/formInput";


export default function LoginForm() {


    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const {mutateAsync,isPending}=UseLoginAction()
    async function onSubmit(data: LoginFormValues) {
    console.log(data)
    await mutateAsync(data)
}
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-24 flex-2 flex flex-col gap-10 [&_*]:min-w-[300px]   ">
            <h1 className="text-4xl font-bold  ">Sign in to Execlusive V2</h1>
            <p className="-mt-6">Enter your details below</p>
            <section className=" flex flex-col gap-4"   >
                <FormInput type={'email'} placeHolder={'E-mail'} register={register} name={'email'}   ></FormInput>
                <p className="text-red-600 h-6">{errors.email?.message}</p>
                <FormInput type={'password'} placeHolder={'Password'} register={register} name={'password'}  ></FormInput>
                <p className="text-red-600">{errors.password?.message}</p>

            </section>
            <FormButton isLoading={isPending}>Sign In</FormButton>
            <p>
              Don&apos;t have an accout?
              <Link className="underline" href={"/signup"}>
                Sign up
              </Link>
            </p>
        </form>
    )
}
