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
            const bookId = action.payload._id || action.payload.title;
            const existingItem = state.cartitems.find(item => 
                (item._id && item._id === action.payload._id) || 
                (item.title === action.payload.title)
            );
            
            if (!existingItem) {
                state.cartitems.push({...action.payload, quantity: 1, uniqueId: bookId})
            } else {
                existingItem.quantity += 1;
            }
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Added to Cart",
                showConfirmButton: false,
                timer: 1500
            }); 
        },
        removeFromCart: (state, action) => {
            state.cartitems = state.cartitems.filter(item => 
                !((item._id && item._id === action.payload._id) || 
                  (item.title === action.payload.title))
            );            
        },
        increaseQuantity: (state, action) => {
            const item = state.cartitems.find(item => 
                (item._id && item._id === action.payload._id) || 
                (item.title === action.payload.title)
            );
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartitems.find(item => 
                (item._id && item._id === action.payload._id) || 
                (item.title === action.payload.title)
            );
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