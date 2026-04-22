import Image from "next/image";
import authImage from '@/public/images/auth_image.webp'
import LoginForm from "@/features/auth/login/components/loginForm";
export default function LoginPage() {
    return (
        <main className="mt-12 flex gap-36 items-start">
            <Image loading="eager" src={authImage} alt='auth image'></Image>
            <LoginForm></LoginForm>
        </main>
    )
}
