import { useQuery } from "@tanstack/react-query";
import productListingAction, {
  type ProductListingParams,
} from "./ProductListingAction";
import type { ProductsResponse } from "./types";

export default function useGetProductListing(params: ProductListingParams) {
  const { isPending, data, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["product-listing", params.mode ?? "all", params.page],
    queryFn: () => productListingAction(params),
    staleTime: 5000,
  });

  return { isPending, data, error };
}
