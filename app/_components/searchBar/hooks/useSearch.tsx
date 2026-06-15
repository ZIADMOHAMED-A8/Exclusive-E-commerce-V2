import { useQuery } from "@tanstack/react-query";
import searchACtion from "../actions/searchAction";

export default function useSearch(query:string){
    return useQuery({
        queryKey:['search',query],
        queryFn:()=>searchACtion(query)
    })
}