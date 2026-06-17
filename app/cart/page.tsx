"use client";

import CartSummary from "@/features/cart/components/cartSummary";
import UseGetCartItems from "@/features/cart/hooks/useGetCartItems";
import { useAppDispatch } from "@/store";
import { cartActions } from "@/store/slices/cartSlice";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    thumbnail: string;
};

export default function CartPage() {
    const { data, isLoading, error } = UseGetCartItems();
    const dispatch = useAppDispatch();
    const cart = (data as { products?: CartItem[] } | null | undefined) ?? null;
    const gridCols =
        "grid grid-cols-1 gap-4 md:grid-cols-[minmax(260px,1fr)_160px_160px_160px] md:items-center";

    if (isLoading) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-10">
      <section className="flex flex-col gap-6">
        {/* Header */}
        <div className="hidden md:grid rounded-md border border-zinc-200 bg-white px-8 py-6 shadow-sm">
          <Skeleton height={20} />
        </div>

        {/* Cart Items */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md border border-zinc-200 bg-white px-4 py-5 shadow-sm sm:px-8 md:py-7"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(260px,1fr)_160px_160px_160px] md:items-center">
              <div className="flex items-center gap-6">
                <Skeleton width={64} height={64} />
                <Skeleton width={180} height={20} />
              </div>

              <Skeleton width={80} height={20} />

              <Skeleton width={96} height={48} />

              <Skeleton width={80} height={20} />
            </div>
          </div>
        ))}

        <div className="pt-10">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div />

            <div className="w-full max-w-md justify-self-end border border-zinc-200 bg-white p-8">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
    if (error) return <p>{error.message}</p>;
    if (!cart?.products?.length) return <p>Your cart is empty</p>;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-10">
      <section className="flex flex-col gap-6">

                {/* Header */}
                <div
                    className={`hidden rounded-md border border-zinc-200 bg-white px-8 py-6 shadow-sm md:grid ${gridCols}`}
                >
                    <p className="text-sm font-medium text-zinc-900">Product</p>
                    <p className="text-sm font-medium text-zinc-900">Price</p>
                    <p className="text-sm font-medium text-zinc-900">Quantity</p>
                    <p className="text-sm font-medium text-zinc-900">Subtotal</p>
                </div>

                {/* Items */}
        {cart.products.map((item) => (
          <div
            key={item.id}
            className={`rounded-md border border-zinc-200 bg-white px-4 py-5 shadow-sm sm:px-8 md:py-7 ${gridCols}`}
          >
                        {/* Product */}
                        <div className="flex items-center gap-6">
                            <div className="relative h-16 w-16 overflow-hidden rounded bg-zinc-50">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-sm font-medium text-zinc-900">
                                {item.title}{item.id}
                            </p>
                        </div>

                        {/* Price */}
                        <p className="flex items-center justify-between text-sm font-medium text-zinc-900 md:block">
                            <span className="md:hidden">Price</span>
                            ${item.price}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center justify-between gap-4 md:block">
                            <span className="text-sm font-medium text-zinc-900 md:hidden">Quantity</span>
                            <input
                                type="number"
                                min={0}
                                defaultValue={item.quantity}
                                onBlur={(e) => {
                                    const nextQty = Number(e.currentTarget.value ?? item.quantity);
                                    dispatch(
                                        cartActions.setQuantity({
                                            id: item.id,
                                            quantity: Number.isFinite(nextQty) ? nextQty : item.quantity,
                                        }),
                                    );
                                }}
                                className="h-12 w-24 rounded-md border border-zinc-900/80 bg-white text-center text-sm font-medium text-zinc-900 outline-none"
                            />
                        </div>

                        {/* Subtotal */}
                        <p className="flex items-center justify-between text-sm font-medium text-zinc-900 md:block">
                            <span className="md:hidden">Subtotal</span>
                            ${item.total}
                        </p>
          </div>
        ))}

        <div className="pt-10">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div />
            <CartSummary></CartSummary>
          </div>
        </div>
      </section>
    </main>
  );
}
