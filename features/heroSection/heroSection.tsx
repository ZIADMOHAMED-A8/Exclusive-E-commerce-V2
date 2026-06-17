import Image from 'next/image'
import banner_1 from '../.././public/images/banner_1.avif'
import banner_2 from '../.././public/images/banner_2.avif'
import banner_3 from '../.././public/images/banner_3.avif'
import banner_4 from '../.././public/images/banner_4.avif'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { RefObject } from 'react'

const imagesArr = [
    banner_1,
    banner_2,
    banner_3,
    banner_4
]

const delayTime = 5000

export default function HeroSection() {

    const [active, setActive] = useState(0)
    const timer: RefObject<null | NodeJS.Timeout> = useRef(null)

    useEffect(() => {
        timer.current = setInterval(() => {
            setActive(prev => (prev + 1) % imagesArr.length)
        }, delayTime);
        return () => {
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [])

    function handleChange(amount: number) {
        if (timer.current === null) return
        if (amount >= 1) {
            setActive(prev => (prev + amount) % imagesArr.length)
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                setActive(prev => (prev + 1) % imagesArr.length)
            }, delayTime);
        }
        else if (amount < 1) {
            setActive(prev => (prev - 1 + imagesArr.length) % imagesArr.length)
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                setActive(prev => (prev + 1) % imagesArr.length)
            }, delayTime);
        }



    }
    return (
        <section className='relative overflow-hidden p-0'>
            <span className='absolute flex -translate-x-1/2 gap-2 bottom-2 left-1/2 z-10'>{imagesArr.map((item, idx) => idx === active ? 
            <button key={item.src} onClick={() => { handleChange(idx-active)}} className='h-2 cursor-pointer rounded-2xl w-10 duration-500 bg-gray-400 block'></button> : 
            <button key={item.src} onClick={() => { handleChange(idx-active)}} className='h-2 rounded-2xl w-10 cursor-pointer bg-white duration-500 block'></button>)}</span>
            <button onClick={() => {
                handleChange(-1)
            }} className='rounded-4xl cursor-pointer bg-white p-2 opacity-50 absolute top-1/2 left-2 -translate-y-1/2 z-10'>
                <ArrowLeft className='' />
            </button>
            <button onClick={() => {
                handleChange(1)
            }} className='rounded-4xl cursor-pointer bg-white p-2 opacity-50 absolute top-1/2 right-2 -translate-y-1/2 z-10'>
                <ArrowRight />
            </button>

            <Image
                src={imagesArr[active]}
                alt="hero_banner"
                width={1440}
                height={300}
                quality={100}
                priority
                className="h-auto w-full"
            />
        </section>

    )
}

