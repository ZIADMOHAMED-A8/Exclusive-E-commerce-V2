import { useQuery } from "@tanstack/react-query";
import getItemsCartAction from "../actions/getCartItemsAction";

export default function UseGetCartItems(){
    const {isLoading,data,error}=useQuery({
        queryKey:['cartItems'],
        queryFn:getItemsCartAction
    })
    
    return {isLoading,data,error}
}