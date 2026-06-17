import { queryClient } from "@/context/query.provider";
import logOutAction from "@/features/auth/logout/logOutAction";
import useToast from "@/features/hooks/useToast";
import { redirect } from "next/navigation";

export async function handleLogout() {
    const toast=useToast()
    queryClient.setQueryData(['getUser'], null);
    await logOutAction();
    queryClient.invalidateQueries({ queryKey: ['getUser'] });
    
    toast.success('You Are Looged Out')
    redirect('/')
    
}