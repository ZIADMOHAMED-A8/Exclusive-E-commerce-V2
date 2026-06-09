import type { Category } from "./types";

export default async function categoriesAction(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories");

  if (!res.ok) {
    throw new Error("something wrong happened");
  }

  return await res.json();
}
