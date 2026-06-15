"use client"
import Link from "next/link"
import { ShoppingCart } from 'lucide-react';
import SearchBar from "./searchBar/searchBar";
import usegetUser from "@/features/auth/user/hooks/getUser";
import useGetCategories from "@/features/Categories/UseGetCategories";

function TopbarLink({ name, src }: { name: string, src: string }) {
    return (
        <li className="
relative
after:absolute
after:left-0
after:top-full
after:h-[2px]
after:w-0
after:bg-gray-400
after:content-['']
after:transition-all
after:duration-500
after:ease-in-out
hover:after:w-full
">
            <Link href={src}>{name}</Link>
        </li>
    )
}


export default function TopBar() {
    const { data: categories, isPending: categoriesLoading } = useGetCategories()
    const { data, isLoading: userLoading } = usegetUser()

    if (!userLoading && !categoriesLoading) {
        return (
            <nav className="flex justify-between px-16 pb-6 border-gray-300 items-center mt-6 border-b">
                <header className="text-3xl font-bold ">Exclusive</header>
                <ul className="flex gap-12 cursor-pointer">
                    <TopbarLink name="Home" src="/" />
                    <TopbarLink name={categories?.at(1)?.name ?? ""} src={`/products?mode=${categories?.at(1)?.name ?? ""}`} />
                    <TopbarLink name={categories?.at(-11)?.name ?? ""} src={`/products?mode=${categories?.at(-11)?.name ?? ""}`} />
                    <TopbarLink name={categories?.at(-12)?.name ?? ""} src={`/products?mode=${categories?.at(-12)?.name ?? ""}`} />




                    {!userLoading
                        ? data
                            ? <TopbarLink name="Log Out" src="/signup" />
                            : <TopbarLink name="Sign" src="/signup" />

                        : ''}
                </ul >
                <SearchBar></SearchBar>
                <Link href={"/cart"}> <ShoppingCart /></Link>

            </nav >
        )
    }
}