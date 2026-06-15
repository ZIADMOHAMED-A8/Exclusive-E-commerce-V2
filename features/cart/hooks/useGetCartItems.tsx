import { useQuery } from "@tanstack/react-query";
import getItemsCartAction from "../actions/getCartItemsAction";

export default function UseGetCartItems(){
    return useQuery({
        queryKey:['cartItems'],
        queryFn:getItemsCartAction
    })
    
     
}