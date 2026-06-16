"use server"
import { cookies } from "next/headers";
export default async function logOutAction(){
    const cookieStore=await cookies()
    let token=cookieStore.get('accessToken')
    if(!token){
        throw new Error('You are not Logged in.')
    }
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    
}