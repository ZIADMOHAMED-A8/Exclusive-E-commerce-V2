import { useEffect, useRef, useState } from "react"

export default function CountDown() {
    const endTime = useRef(Date.now() + 60000 * 30) 
    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now()) 
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const diff = Math.max(0, endTime.current - now)
    const days=Math.floor(diff / (60000*60*24))
    const hours = Math.floor(diff / (60000*60))
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    return (
        <div className="[&>span]:font-bold [&>span]:text-2xl flex justify-between w-52">
            <span className="relative before:content-['days'] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-10] before:text-sm">{days}</span>
            <span>:</span>
            <span className="relative before:content-['hours'] before:left-[50%] before:translate-x-[-50%] before:absolute before:top-[-10] before:text-sm">{hours}</span>
            <span>:</span>

            <span className="relative before:content-['minutes'] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-10] before:text-sm">{minutes}</span>
            <span>:</span>

            <span className="relative before:content-['seconds'] before:absolute before:left-[50%] before:translate-x-[-50%] before:top-[-10] before:text-sm">{seconds}</span>
        </div>
    )
}