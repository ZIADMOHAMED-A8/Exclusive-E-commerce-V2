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

const delayTime = 3000

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
        if (amount >= 1) {
            setActive(prev => (prev + amount) % imagesArr.length)
        } else if (amount < 0) {
            setActive(prev => (prev + amount + imagesArr.length) % imagesArr.length)
        }
        restartInterval()
    }
    function restartInterval() {
        if (timer.current === null) return
        clearInterval(timer.current)
        timer.current = setInterval(() => {
            setActive(prev => (prev + 1) % imagesArr.length)
        }, delayTime);
    }
    function setAndRestart(idx:number){
            setActive(idx)
        restartInterval()

    }

    return (
        <section className='relative overflow-hidden p-0'>
            {/* Dots */}
            <span className='absolute flex -translate-x-1/2 gap-1 sm:gap-2 bottom-1 sm:bottom-2 left-1/2 z-10'>
                {imagesArr.map((item, idx) => (
                    <button
                        key={item.src}
                        onClick={() =>setAndRestart(idx)}
                        className={`h-1.5 sm:h-2 cursor-pointer rounded-2xl w-5 sm:w-10 duration-500 block ${idx === active ? 'bg-gray-400' : 'bg-white'
                            }`}
                    />
                ))}
            </span>

            {/* Prev button */}
            <button
                onClick={() => handleChange(-1)}
                className='rounded-full cursor-pointer bg-white p-1 sm:p-2 opacity-50 hover:opacity-80 absolute top-1/2 left-1 sm:left-2 -translate-y-1/2 z-10 duration-300'
            >
                <ArrowLeft className='w-4 h-4 sm:w-6 sm:h-6' />
            </button>

            {/* Next button */}
            <button
                onClick={() => handleChange(1)}
                className='rounded-full cursor-pointer bg-white p-1 sm:p-2 opacity-50 hover:opacity-80 absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 z-10 duration-300'
            >
                <ArrowRight className='w-4 h-4 sm:w-6 sm:h-6' />
            </button>

            <Image
                src={imagesArr[active]}
                alt="hero_banner"
                width={1440}
                height={300}
                quality={100}
                priority
                className="h-48 sm:h-64 md:h-auto w-full object-cover"
            />
        </section>
    )
}