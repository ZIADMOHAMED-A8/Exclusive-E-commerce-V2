"use server"
import { cookies } from "next/headers";
import { LoginFormValues } from "./types";
export default async function loginAction(values: LoginFormValues) {
    console.log("values", values)
    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({    // Since the dummy api I'm using doesnt support adding new users , thus I'm sending hardcoded credinitals instead of
            username: 'emilys',     // sending the form values
            password: 'emilyspass',
        })
    })
    const data = await res?.json()
    if (!res.ok) {
        throw new Error('something wrong happened')
    }

    const cookieStore = await cookies()
    cookieStore.set('accessToken', data.accessToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24, })
    cookieStore.set('refreshToken', data.refreshToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24, })
   
    return data

}