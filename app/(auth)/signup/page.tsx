
import Image from "next/image";
import authImage from '@/public/images/auth_image.webp'
import SignupForm from "@/features/auth/signup/components/signupForm";

export default function SignUpPage() {
    return (
        <main className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-8 lg:mt-12 lg:flex-row lg:items-start lg:gap-24">
            <Image loading="eager" src={authImage} alt='auth image' className="h-56 w-full object-cover lg:h-auto lg:w-1/2"></Image>
            <SignupForm></SignupForm>
        </main>
    )
}
