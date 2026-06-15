
"use server"
import { getToken } from "@/features/utils/auth/getToken"
import { cookies } from "next/headers";

export default async function getUserAction(retried = false) {
    let token = await getToken()
    if (!token.accessToken && !token.refreshToken) throw new Error('Session expoired, Please login again')
    const res = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.accessToken}`,
        },
    })
    const data = await res.json()
    if (res.status === 401) {
        if (retried) {
            throw new Error("Unable to refresh session")
        }
        if (!token.refreshToken) throw new Error('Session expoired, Please login again')
        console.log('refreshing the token')
        const res = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refreshToken: `${token.refreshToken}`, 
            }),
        })
        if (res.ok) {
            const data = await res.json()
            const cookieStore = await cookies()
            cookieStore.set('accessToken', data.accessToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24, })
            cookieStore.set('refreshToken', data.refreshToken, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30, })
            return getUserAction(true)
        }
        else {
            const data = await res.json()
            throw new Error(data.message)
        }

    }
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data

}
