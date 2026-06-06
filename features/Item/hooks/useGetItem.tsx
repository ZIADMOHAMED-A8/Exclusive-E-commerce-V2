import { useQuery } from "@tanstack/react-query";
import getItemAction from "../actions/getItemAction";

export default function useGetItem(itemId?: string) {
    const{data,isLoading,error}=useQuery({
        queryKey:['getItem', itemId],
        enabled: !!itemId,
        queryFn: () => {
          if (!itemId) throw new Error("Missing item id");
          return getItemAction(itemId);
        },
    })
    return {data,isLoading,error}
}
