import { LoginFormValues } from "./types";

export default async function loginAction(values: LoginFormValues) {
    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  
            username: 'emilys',
            password: 'emilyspass',
        })
    })
    const data = await res?.json()
    if(!res.ok){
        throw new Error('something wrong happened')
    }
    return data

}