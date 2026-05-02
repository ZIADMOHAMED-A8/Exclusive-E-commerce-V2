import { createSlice } from "@reduxjs/toolkit";
type cartState = {
    id: string,
    quantity: number
}
const initialState: cartState[] = JSON.parse(localStorage.getItem('cart') || '[]')

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
                return
            }
            state[itemIndex].quantity += 1;
            updateLocalStorage(state)
            console.log(state)
        },
        removeItem(state, action) {
            const itemIndex = state?.findIndex((item) => item.id === action.payload.id)

            if (itemIndex === -1) {
                throw new Error("Item not found")
            }
            state[itemIndex].quantity -= 1;
            state = filterItems(state)
            updateLocalStorage(state)
        },
        clearCart(state) {
            state = []
            updateLocalStorage(state)
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