import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()

    const token = cookieStore.get('accessToken')?.value
    console.log(token)



    return Response.json(token)
}
