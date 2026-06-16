"use client"
import { useMutation } from "@tanstack/react-query";
import loginAction from "./loginAction";
import { LoginFormValues } from "./types";
import { queryClient } from "@/context/query.provider";
import { useRouter } from "next/navigation";
import useToast from "@/features/hooks/useToast";


export default function UseLoginAction(){
    const router=useRouter()
    const toast=useToast()
    const {mutateAsync,error,isPending}=useMutation({
        mutationFn:async (values:LoginFormValues)=>{
            return await loginAction(values)
        }
        ,onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['getUser']})
            router.push('/')
            toast.success('You Are Looged In')
            
        }

    })
    return {mutateAsync,error,isPending}
}