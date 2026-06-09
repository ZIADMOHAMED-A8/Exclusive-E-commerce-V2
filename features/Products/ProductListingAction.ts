import type { ProductsResponse } from "./types";

export const PRODUCTS_PAGE_LIMIT = 12;

export type ProductListingParams = {
  mode?: string;
  page: number;
};

export default async function productListingAction({
  mode,
  page,
}: ProductListingParams): Promise<ProductsResponse> {
  const skip = (page - 1) * PRODUCTS_PAGE_LIMIT;
  const endpoint = mode
    ? `https://dummyjson.com/products/category/${encodeURIComponent(mode)}`
    : "https://dummyjson.com/products";

  const res = await fetch(
    `${endpoint}?limit=${PRODUCTS_PAGE_LIMIT}&skip=${skip}`,
  );

  if (!res.ok) {
    throw new Error("something wrong happened");
  }

  return await res.json();
}
