"use client";

import CartSummary from "@/features/cart/components/cartSummary";
import UseGetCartItems from "@/features/cart/hooks/useGetCartItems";
import { useAppDispatch } from "@/store";
import { cartActions } from "@/store/slices/cartSlice";
import Image from "next/image";

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
        "grid grid-cols-[minmax(260px,1fr)_160px_160px_160px] items-center";

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>error loading cart</p>;
    if (!cart?.products?.length) return <p>Your cart is empty</p>;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-10">
      <section className="flex flex-col gap-6">

                {/* Header */}
                <div
                    className={`rounded-md border border-zinc-200 bg-white px-8 py-6 shadow-sm ${gridCols}`}
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
            className={`rounded-md border border-zinc-200 bg-white px-8 py-7 shadow-sm ${gridCols}`}
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
                        <p className="text-sm font-medium text-zinc-900">
                            ${item.price}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center">
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
                        <p className="text-sm font-medium text-zinc-900">
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
