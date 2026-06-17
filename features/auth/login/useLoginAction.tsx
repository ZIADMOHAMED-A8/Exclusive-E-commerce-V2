"use client"
import { useMutation } from "@tanstack/react-query";
import loginAction from "./loginAction";
import { LoginFormValues } from "./types";
import { queryClient } from "@/context/query.provider";
import { useRouter, useSearchParams } from "next/navigation";
import useToast from "@/features/hooks/useToast";

export default function UseLoginAction() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const router = useRouter()
    const toast = useToast()
    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (values: LoginFormValues) => {
            return await loginAction(values)
        }
        , onSuccess: () => {
            console.log('ana nag7t')
            queryClient.invalidateQueries({ queryKey: ['getUser'] })
            console.log("test",callbackUrl)
            router.push(callbackUrl || '/')
            toast.success('You Are Looged In')

        }

    })
    return { mutateAsync, error, isPending }
}