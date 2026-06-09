"use client";

import ItemCard from "@/features/auth/components/itemCard";
import type { Product } from "@/features/types";
import Link from "next/link";
import { PRODUCTS_PAGE_LIMIT } from "../ProductListingAction";
import useGetProductListing from "../UseGetProductListing";

function formatMode(mode?: string) {
  if (!mode) {
    return "All Products";
  }

  return mode
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getProductsHref(page: number, mode?: string) {
  const params = new URLSearchParams();

  if (mode) {
    params.set("mode", mode);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export default function ProductsPageContainer({
  mode,
  page,
}: {
  mode?: string;
  page: number;
}) {
  const { data, isPending, error } = useGetProductListing({ mode, page });

  if (isPending) {
    return <p className="px-4 py-8">loading...</p>;
  }

  if (error) {
    return <p className="px-4 py-8">{error.message}</p>;
  }

  if (!data) {
    return null;
  }

  const totalPages = Math.max(1, Math.ceil(data.total / PRODUCTS_PAGE_LIMIT));
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-sm font-medium text-[#db4444]">Products</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              {formatMode(mode)}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Showing {data.products.length} of {data.total} products
            </p>
          </div>
        </div>
      </section>

      {data.products.length ? (
        <section
          className="grid w-full gap-x-6 gap-y-6 gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
        >
          {data.products.map((product: Product) => (
            <ItemCard key={product.id} item={product} />
          ))}
        </section>
      ) : (
        <p className="rounded-md border border-zinc-200 p-8 text-center text-zinc-600">
          No products found.
        </p>
      )}

      <nav className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href={getProductsHref(page - 1, mode)}
          aria-disabled={!canGoPrevious}
          className={`rounded-md border px-4 py-2 text-sm font-medium ${
            canGoPrevious
              ? "border-zinc-300 text-zinc-900 hover:border-zinc-500"
              : "pointer-events-none border-zinc-200 text-zinc-400"
          }`}
        >
          Previous
        </Link>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <Link
              key={pageNumber}
              href={getProductsHref(pageNumber, mode)}
              className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium ${
                pageNumber === page
                  ? "border-[#db4444] bg-[#db4444] text-white"
                  : "border-zinc-300 text-zinc-900 hover:border-zinc-500"
              }`}
            >
              {pageNumber}
            </Link>
          ),
        )}

        <Link
          href={getProductsHref(page + 1, mode)}
          aria-disabled={!canGoNext}
          className={`rounded-md border px-4 py-2 text-sm font-medium ${
            canGoNext
              ? "border-zinc-300 text-zinc-900 hover:border-zinc-500"
              : "pointer-events-none border-zinc-200 text-zinc-400"
          }`}
        >
          Next
        </Link>
      </nav>
    </main>
  );
}