"use client"
import { queryClient } from "@/context/query.provider";
import { createSlice } from "@reduxjs/toolkit";
type cartState = {
    id: string,
    quantity: number
}
const initialState: cartState[] = typeof window !== 'undefined' 
  ? JSON.parse(localStorage.getItem('cart') || '[]') 
  : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const itemIndex = state?.findIndex((item) => item.id === action.payload.id)
            if (itemIndex === -1) {
                state.push({
                    id: action.payload.id,
                    quantity: 1
                })
                updateLocalStorage(state)
                queryClient.invalidateQueries({queryKey:['cartItems']})
                return
            }
            state[itemIndex].quantity += action.payload.quantity ? action.payload.quantity : 1;
            
            updateLocalStorage(state)
            console.log(state)
                queryClient.invalidateQueries({queryKey:['cartItems']})

        },
        setQuantity(state, action) {
            const itemIndex = state?.findIndex((item) => item.id === action.payload.id)
            const parsed = Number(action.payload.quantity ?? 0);
            const quantity = Number.isFinite(parsed) ? Math.max(0, parsed) : 0;

            if (itemIndex === -1) {
                if (quantity <= 0) return
                state.push({
                    id: action.payload.id,
                    quantity,
                })
                updateLocalStorage(state)
                queryClient.invalidateQueries({queryKey:['cartItems']})
                return
            }

            if (quantity <= 0) {
                const next = state.filter((item) => item.id !== action.payload.id)
                updateLocalStorage(next)
                queryClient.invalidateQueries({queryKey:['cartItems']})
                return next
            }

            state[itemIndex].quantity = quantity;
            updateLocalStorage(state)
            queryClient.invalidateQueries({queryKey:['cartItems']})
        },
        removeItem(state, action) {
            const itemIndex = state?.findIndex((item) => item.id === action.payload.id)

            if (itemIndex === -1) {
                throw new Error("Item not found")
            }
            state[itemIndex].quantity -= 1;
            const next = filterItems(state)
            updateLocalStorage(next)
            queryClient.invalidateQueries({queryKey:['cartItems']})
            return next
        },
        clearCart() {
            const next: cartState[] = []
            updateLocalStorage(next)
            queryClient.invalidateQueries({queryKey:['cartItems']})
            return next
        }
    }
})

function filterItems(state: cartState[]) {
    return state.filter((item) => item.quantity>0)
}
function updateLocalStorage(state: cartState[]) {
    localStorage.setItem('cart', JSON.stringify(state))
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
