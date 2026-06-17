import { NextRequest } from "next/server";
import { getToken } from "./features/utils/auth/getToken";
import { NextResponse } from "next/server";

export default async function middleware(req:NextRequest){
    const authPaths=['/login','signup']
    const forbiddenRoutes=['/checkout','/profile']
    let token=await getToken()
    if(token.accessToken && authPaths.some((item)=>item===req.nextUrl.pathname)){
        return NextResponse.redirect(new URL("/", req.url));
    }
    if(!token.accessToken && forbiddenRoutes.some((item)=>item===req.nextUrl.pathname)){
        let url=new URL("/login", req.url)
        url.searchParams.set('callbackUrl', req.nextUrl.pathname)
        return NextResponse.redirect(url);
    }

}