import Image from 'next/image'
import banner_1 from '../.././public/images/banner_1.avif'
import banner_2 from '../.././public/images/banner_2.avif'
import banner_3 from '../.././public/images/banner_3.avif'
import banner_4 from '../.././public/images/banner_4.avif'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { RefObject } from 'react'
export default function HeroSection() {

    const [active, setActive] = useState(0)
    console.log('ff')
    let timer: RefObject<null | NodeJS.Timeout> = useRef(null)
    let delayTime = 5000
    useEffect(() => {
        console.log('f')
        timer.current = setInterval(() => {
            handleActive()
            console.log(active)
        }, delayTime);
        return () => {
            clearInterval(timer.current)
        }
    }, [])
    const imagesArr = [banner_1,
        banner_2,
        banner_3,
        banner_4
    ]
    function handleActive() {
        setActive(prev => (prev + 1) % imagesArr.length)
    }
    function handleForwardChange() {
        console.log('ff')

        if (timer.current === null) return
        handleActive()
        console.log('gzr')
        clearInterval(timer.current)
        timer.current = setInterval(() => {
            handleActive()
            console.log(active)
        }, delayTime);

    }
    function handleBackWardChange() {
        console.log(active, "before")

        if (timer.current === null) return


    }
    function handleChange(amount: number) {
        if (timer.current === null) return
        if (amount >= 1) {
            setActive(prev => (prev + amount) % imagesArr.length)
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                handleActive()
                console.log(active)
            }, delayTime);
        }
        else if (amount < 1) {
            setActive(prev => (prev - 1 + imagesArr.length) % imagesArr.length)
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                handleActive()
                console.log(active)
            }, delayTime);
        }



    }
    return (
        <section className='relative p-0'>
            <span className='absolute flex gap-2 bottom-2 left-1/2 z-10'>{imagesArr.map((item, idx) => idx === active ? 
            <button onClick={() => { handleChange(idx-active)}} className='h-2 cursor-pointer rounded-2xl w-10 duration-500 bg-gray-400 block'></button> : 
            <button onClick={() => { handleChange(idx-active)}} className='h-2 rounded-2xl w-10 cursor-pointer bg-white duration-500 block'></button>)}</span>
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

            {imagesArr.map((item, idx) => idx === active ? <Image
                src={item}
                alt="hero_banner"
                width={1440}
                key={item.src}
                height={300}
                quality={100}
                priority
                className="w-full duration-1000 h-auto opacity-100"
            /> : <Image
                src={item}
                key={item.src}
                alt="hero_banner"
                width={1440}
                height={300}
                quality={100}
                priority
                className="w-full h-0 duration-1000 opacity-0"
            />)}
        </section>

    )
}

