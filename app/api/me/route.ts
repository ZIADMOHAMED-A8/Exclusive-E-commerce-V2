import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()

    const token = cookieStore.get('accessToken')?.value
    console.log(token)
    if (!token) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        )
    }

    const res = await fetch(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    const data = await res.json()

    return Response.json(data)
}