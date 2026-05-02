import { useQuery } from "@tanstack/react-query";
import productsAction from "./ProductsAction";
import type { ProductsResponse, ProductsType } from "./types";

export default function useGetProducts(productsType: ProductsType) {
  const { isPending, data, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", productsType],
    queryFn: () => productsAction(productsType),
    staleTime:5000
  });
  return { isPending, data, error };
}
