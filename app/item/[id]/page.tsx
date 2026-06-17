"use client";

import useToast from "@/features/hooks/useToast";
import useGetItem from "@/features/Item/hooks/useGetItem";
import { Product } from "@/features/types";
import { StarsDisplayer } from "@/features/utils/stardDisplayer";
import toCurrency from "@/features/utils/toCurrency";
import { useAppDispatch } from "@/store";
import { cartActions } from "@/store/slices/cartSlice";
import { Heart, RotateCcw, Truck } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
const COLORS = [
  { name: "Red", value: "#EF4444" },
  { name: "Blue", value: "#2563EB" },
  { name: "Gray", value: "#E5E7EB" },
] as const;

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export default function ItemPage() {
  const toast = useToast()
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState<(typeof COLORS)[number]>(
    COLORS[0]
  );
  const [selectedSize, setSelectedSize] = useState<(typeof SIZES)[number]>(
    "M"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<{
    itemId: number;
    src: string;
  } | null>(null);

  const itemId = typeof id === "string" && id.length ? id : undefined;
  const { data, isLoading, error } = useGetItem(itemId);
  const item = (data as Product | null | undefined) ?? null;

  const rating = useMemo(() => {
    const raw = Number(item?.rating ?? 0);
    return Number.isFinite(raw) ? raw : 0;
  }, [item?.rating]);

  const reviewsCount = item?.reviews?.length ?? 0;
  const defaultImage = item?.thumbnail || item?.images?.[0] || null;
  const shownImage =
    activeImage && item && activeImage.itemId === item.id
      ? activeImage.src
      : defaultImage;

  if (!itemId) return null;
  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Images */}
          <section className="flex flex-col gap-4">
            <Skeleton height={500} />

            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  width={80}
                  height={80}
                />
              ))}
            </div>
          </section>

          {/* Details */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Skeleton height={40} width="80%" />

              <div className="flex gap-2">
                <Skeleton width={120} height={20} />
                <Skeleton width={100} height={20} />
              </div>

              <Skeleton width={140} height={35} />

              <Skeleton count={4} />
            </div>

            <Skeleton height={1} />

            {/* Colors */}
            <div className="flex items-center gap-4">
              <Skeleton width={60} height={24} />

              <div className="flex gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    circle
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-4">
              <Skeleton width={60} height={24} />

              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width={40}
                    height={40}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + buttons */}
            <div className="flex flex-wrap gap-4">
              <Skeleton width={140} height={48} />
              <Skeleton width={220} height={48} />
              <Skeleton circle width={48} height={48} />
            </div>

            {/* Delivery Box */}
            <div className="rounded-md border border-zinc-200">
              <div className="p-5 flex flex-col gap-2">
                <Skeleton width={180} height={24} />
                <Skeleton count={2} />
              </div>

              <div className="border-t border-zinc-200 p-5 flex flex-col gap-2">
                <Skeleton width={180} height={24} />
                <Skeleton count={2} />
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
  if (error) return <p className="px-4 py-8">error loading item</p>;
  if (!item) return null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50">
            {shownImage ? (
              <Image
                alt={item.title}
                src={shownImage}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-contain"
                priority
              />
            ) : null}
          </div>

          {item.images?.length ? (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {item.images.slice(0, 8).map((src) => {
                const isActive = src === shownImage;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage({ itemId: item.id, src })}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-white ${isActive ? "border-zinc-900" : "border-zinc-200"
                      }`}
                    aria-label="Select image"
                  >
                    <Image
                      alt={item.title}
                      src={src}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              {item.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <span className="flex items-center gap-1">
                <StarsDisplayer num={rating} size={18} />
              </span>
              <span className="text-zinc-500">({reviewsCount} Reviews)</span>
              {item.stock > 0 ? (
                <span className="text-emerald-600">In Stock</span>
              ) : (
                <span className="text-rose-600">Out of Stock</span>
              )}
            </div>

            <p className="text-2xl font-medium text-zinc-900">
              {toCurrency(item.price)}
            </p>

            <p className="max-w-prose text-sm leading-6 text-zinc-700">
              {item.description}
            </p>
          </div>

          <div className="h-px w-full bg-zinc-200" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p className="w-14 text-base font-medium text-zinc-900">Colors:</p>
              <div className="flex items-center gap-3">
                {COLORS.map((c) => {
                  const isSelected = c.value === selectedColor.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`h-6 w-6 rounded-full border ${isSelected ? "border-zinc-900" : "border-zinc-400"
                        }`}
                      style={{ backgroundColor: c.value }}
                      aria-label={`Color ${c.name}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="w-14 text-base font-medium text-zinc-900">Size:</p>
              <div className="flex flex-wrap items-center gap-2">
                {SIZES.map((s) => {
                  const isSelected = s === selectedSize;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`h-10 w-10 rounded-md border text-sm font-medium transition ${isSelected
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400"
                        }`}
                      aria-label={`Size ${s}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-12 items-center overflow-hidden rounded-md border border-zinc-300">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-full w-12 bg-white text-xl font-semibold text-zinc-900 hover:bg-zinc-50"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="flex h-full w-14 items-center justify-center text-base font-medium text-zinc-900">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-full w-12 bg-[#db4444] text-xl font-semibold text-white hover:bg-[#c63c3c]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"

                onClick={() => {
                  dispatch(
                    cartActions.addItem({
                      id: item.id,
                      quantity,
                      color: selectedColor.value,
                      size: selectedSize,
                    })
                  )
                  toast.success(`${quantity} ${item.title} Has Been Added To Your Cart. `)
                }
                }
                disabled={item.stock <= 0}
                className="h-12 min-w-56 rounded-md bg-[#db4444] px-8 text-base font-medium text-white hover:bg-[#c63c3c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add to cart
              </button>

              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-md border border-zinc-300 bg-white hover:bg-zinc-50"
                aria-label="Add to wishlist"
              >
                <Heart className="h-6 w-6 text-zinc-900" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-zinc-200">
            <div className="flex gap-4 border-b border-zinc-200 p-5">
              <div className="flex h-10 w-10 items-center justify-center">
                <Truck className="h-7 w-7 text-zinc-900" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-zinc-900">Free Delivery</p>
                <p className="text-sm text-zinc-700 underline underline-offset-4">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center">
                <RotateCcw className="h-7 w-7 text-zinc-900" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-zinc-900">Return Delivery</p>
                <p className="text-sm text-zinc-700">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline underline-offset-4">Details</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
