import { createSlice } from '@reduxjs/toolkit'
import Swal from "sweetalert2"; 

const initialState = {
    cartitems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: { 
        addToCart: (state, action) => {
            const existingItem = state.cartitems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartitems.push({...action.payload, quantity: 1})
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                existingItem.quantity += 1;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item Added to Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } 
        },
        removeFromCart: (state, action) => {
            state.cartitems = state.cartitems.filter(item => item._id !== action.payload._id);            
        },
        increaseQuantity: (state, action) => {
            const item = state.cartitems.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartitems.find(item => item._id === action.payload._id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.cartitems = [];
        }
   }
})

//Export actions 
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;