"use client"
import Link from "next/link"
import { Menu, ShoppingCart, X } from 'lucide-react';
import SearchBar from "./searchBar/searchBar";
import usegetUser from "@/features/auth/user/hooks/getUser";
import useGetCategories from "@/features/Categories/UseGetCategories";
import { handleLogout } from "@/features/utils/auth/logout";
import { useState } from "react";

function TopbarLink({ name, src, onClick }: { name: string, src: string, onClick?: () => void }) {
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
            <Link onClick={onClick} href={src}>{name}</Link>
        </li>
    )
}

function LogoutButton({ onClick }: { onClick?: () => void }) {

 

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
            <button onClick={() => {
                onClick?.()
                handleLogout()
            }} type="button">Log out</button>
        </li>
    )
}

export default function TopBar() {
    const { data: categories, isPending: categoriesLoading } = useGetCategories()
    const { data, isLoading: userLoading } = usegetUser()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    function closeMobileMenu() {
        setMobileMenuOpen(false)
    }

    if (!categoriesLoading) {
        return (
            <nav className="flex flex-col gap-5 px-4 pb-6 border-gray-300 items-stretch mt-6 border-b sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-16">
                <div className="flex items-center justify-between gap-4">
                    <header className="text-3xl font-bold cursor-pointer "><Link href='/'>Exclusive</Link></header>
                    <div className="flex items-center gap-4 lg:hidden">
                        <Link href={"/cart"} aria-label="Cart"> <ShoppingCart /></Link>
                        <button
                            type="button"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
                <ul className={`${mobileMenuOpen ? "flex" : "hidden"} flex-col gap-4 text-nowrap rounded-md border border-gray-200 bg-white p-4 shadow-sm lg:flex lg:flex-row lg:gap-12 lg:border-0 lg:p-0 lg:shadow-none`}>
                    <TopbarLink onClick={closeMobileMenu} name="Home" src="/" />
                    <TopbarLink onClick={closeMobileMenu} name={categories?.at(1)?.name ?? ""} src={`/products?mode=${categories?.at(1)?.name ?? ""}`} />
                    <TopbarLink onClick={closeMobileMenu} name={categories?.at(-11)?.name ?? ""} src={`/products?mode=${categories?.at(-11)?.name ?? ""}`} />
                    <TopbarLink onClick={closeMobileMenu} name={categories?.at(-12)?.name ?? ""} src={`/products?mode=${categories?.at(-12)?.name ?? ""}`} />

                    {!userLoading
                        ? data
                            ? <LogoutButton onClick={closeMobileMenu}></LogoutButton>
                            : <TopbarLink onClick={closeMobileMenu} name="Sign In" src="/signup" />
                        : ''}
                </ul >
                <SearchBar></SearchBar>
                <Link className="hidden lg:block" href={"/cart"}> <ShoppingCart /></Link>
            </nav >
        )
    }
}
