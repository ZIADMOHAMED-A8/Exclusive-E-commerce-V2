import Image from "next/image";
import authImage from '@/public/images/auth_image.webp'
import LoginForm from "@/features/auth/login/components/loginForm";
import SignupForm from "@/features/auth/signup/components/signupForm";
export default function SignUpPage() {
    return (
        <main className="mt-12 flex gap-36 items-start">
            <Image loading="eager" src={authImage} alt='auth image'></Image>
            <SignupForm></SignupForm>
        </main>
    )
}
