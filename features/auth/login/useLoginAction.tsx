import { useMutation } from "@tanstack/react-query";
import loginAction from "./loginAction";
import { LoginFormValues } from "./types";

export default function UseLoginAction(){
    const {mutateAsync,error,isPending}=useMutation({
        mutationFn:async (values:LoginFormValues)=>{
            return await loginAction(values)
        }
    })
    return {mutateAsync,error,isPending}
}