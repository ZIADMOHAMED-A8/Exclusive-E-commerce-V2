import { PRODUCTS_TYPE_QUERY, type ProductsResponse, type ProductsType } from "./types";

export default async function productsAction(
  productsType: ProductsType,
): Promise<ProductsResponse> {
  const { limit, skip } = PRODUCTS_TYPE_QUERY[productsType];
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  );
  if (!res.ok) {
    throw new Error("something wrong happened");
  }
  return await res.json();
}
