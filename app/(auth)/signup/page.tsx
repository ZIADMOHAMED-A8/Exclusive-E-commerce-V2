
"use client"
import Image from "next/image";
import authImage from '@/public/images/auth_image.webp'
import LoginForm from "@/features/auth/login/components/loginForm";
import SignupForm from "@/features/auth/signup/components/signupForm";
import { getToken } from "@/features/utils/auth/getToken";
import getUserAction from "@/features/auth/user/actions/getUserAction";
import usegetUser from "@/features/auth/user/hooks/getUser";
export default function SignUpPage() {
    const { data, isLoading } = usegetUser()
    if (!isLoading) {
        console.log("data",data)

    }
    return (
        <main className="mt-12 flex gap-36 items-start">
            <Image loading="eager" src={authImage} alt='auth image'></Image>
            <SignupForm></SignupForm>
        </main>
    )
}
