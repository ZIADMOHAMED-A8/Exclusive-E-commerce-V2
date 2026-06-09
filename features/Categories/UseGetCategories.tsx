import { useQuery } from "@tanstack/react-query";
import categoriesAction from "./CategoriesAction";
import type { Category } from "./types";

export default function useGetCategories() {
  const { isPending, data, error } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: categoriesAction,
    staleTime: 5000,
  });

  return { isPending, data, error };
}
