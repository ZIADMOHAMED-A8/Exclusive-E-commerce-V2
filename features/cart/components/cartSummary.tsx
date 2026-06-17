"use client"

import UseGetCartItems from "../hooks/useGetCartItems";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

export default function CartSummary() {
    const { data, isLoading, error, isError } = UseGetCartItems();
    const router = useRouter()

    if (isLoading) {
        return (
            <aside className="w-full max-w-md justify-self-end border border-zinc-900/80 bg-white p-8">
                <Skeleton width={120} height={28} />

                <div className="mt-6 flex flex-col gap-5">
                    <Skeleton height={20} />
                    <Skeleton height={1} />
                    <Skeleton height={20} />
                    <Skeleton height={1} />
                    <Skeleton height={20} />
                </div>

                <Skeleton
                    className="mt-10"
                    height={56}
                />
            </aside>
        );
    }
    if (isError) {
        return <p>{error.message}</p>
    }

    return (

        <aside className="w-full max-w-md justify-self-end border border-zinc-900/80 bg-white p-8">
            <h2 className="text-base font-medium text-zinc-900">Cart Total</h2>

            <div className="mt-6 flex flex-col gap-5 text-sm text-zinc-900">
                <div className="flex items-center justify-between">
                    <span>SubTotal:</span>
                    <span className="tabular-nums">{data.discountedTotal.toFixed(2)}</span>
                </div>

                <div className="h-px w-full bg-zinc-900/15" />

                <div className="flex items-center justify-between">
                    <span>Shiping:</span>
                    <span className="tabular-nums">{(data.total - data.discountedTotal).toFixed(2)}</span>
                </div>

                <div className="h-px w-full bg-zinc-900/15" />

                <div className="flex items-center justify-between font-medium">
                    <span>Total:</span>
                    <span className="tabular-nums">{data.total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => {
                    router.push('/checkout')
                }}
                type="button"
                className="mt-10 w-full rounded bg-red-500 px-6 py-4 text-center text-base font-medium text-white hover:bg-red-600"
            >
                Procees to checkout
            </button>
        </aside>
    )
}