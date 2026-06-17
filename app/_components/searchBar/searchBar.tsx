"use client";

import { useEffect, useRef, useState } from "react";
import useSearch from "./hooks/useSearch";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/features/types";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { data, isError, isLoading, error } = useSearch(query);
    const [open, setOpen] = useState(false)
    const listRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const handleDocumentClick = () => {
            setOpen(false);
        };

        const handleListClick = (e: Event) => {
            e.stopPropagation();
        };
        const listNode = listRef.current;
        document.addEventListener('click', handleDocumentClick)
        if (listNode) {
            listNode.addEventListener('click', handleListClick)

        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            document.removeEventListener('click', handleDocumentClick)
            listNode?.removeEventListener('click', handleListClick)
        };
    }, []);

    return (
        <div ref={listRef} className="relative w-full max-w-md">
            <input
                type="search"
                placeholder="Search products..."
                onChange={(e) => {
                    setOpen(true)
                    const value = e.target.value;

                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                    }

                    timerRef.current = setTimeout(() => {
                        setQuery(value.trim());
                    }, 500);
                }}
                className="w-full h-12 px-4 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-all"
            />

            {(query && open) && (
                <ul className="absolute top-full left-0 mt-2 w-full max-h-80 overflow-y-auto scrollbar-none rounded-xl border border-gray-200 bg-white shadow-xl z-[9999]">
                    {isLoading && (
                        <li className="p-4 text-center text-gray-500">
                            Loading...
                        </li>
                    )}

                    {isError && (
                        <li className="p-4 text-center text-red-500">
                            {error?.message}
                        </li>
                    )}

                    {!isLoading &&
                        !isError &&
                        data?.products?.length === 0 && (
                            <li className="p-4 text-center text-gray-500">
                                No products found
                            </li>
                        )}

                    {data?.products?.map((product: Product) => (
                        <Link key={product.id} href={`/item/${product.id}`}>
                            <li
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    width={50}
                                    height={50}
                                    className="rounded-lg object-cover shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-900 truncate">
                                        {product.title}
                                    </h4>

                                    <p className="text-sm text-green-600 font-semibold">
                                        ${product.price}
                                    </p>
                                </div>
                            </li></Link>
                    ))}
                </ul>
            )}
        </div>
    );
}
