import type { Product } from "@/features/types";

export type ProductsType = "sales" | "all" | 'new_Arrival' | 'Best_selling_products';

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const PRODUCTS_TYPE_QUERY: Record<
  ProductsType,
  { limit: number; skip: number }
> = {
  all: { limit: 20, skip: 0 },
  sales: { limit: 10, skip: 100 },
  new_Arrival:{limit:10,skip:20},
  Best_selling_products:{limit:10,skip:40}




};
