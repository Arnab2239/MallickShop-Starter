import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = { productId: string; name: string; price: number; qty: number }

const initialState: { items: CartItem[] } = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const found = state.items.find(i => i.productId === action.payload.productId)
      if (found) found.qty += action.payload.qty
      else state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.productId !== action.payload)
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const it = state.items.find(i => i.productId === action.payload.id)
      if (it) it.qty = action.payload.qty
    },
    clearCart(state) { state.items = [] }
  }
})

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
