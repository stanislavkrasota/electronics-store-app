import { createReducer, on } from '@ngrx/store';
import {addToCart, removeFromCartPerItem, clearCart, removeFormCartByProductType} from './cart.actions';
import {Product} from "../../../models/product";
import {CartItem} from "../../../models/cartState";

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => addToCartReducer(state, product)),
  on(removeFromCartPerItem, (state, { productId }) => removeFromCartReducer(state, productId)),
  on(removeFormCartByProductType, (state, { productId }) => state.filter(item => item.product.id !== productId)),
  on(clearCart, () => [])
);

function addToCartReducer(state: CartItem[], product: Product): CartItem[] {
  const existingItem = state.find(item => item.product.id === product.id);

  if (existingItem) {
    // If the product already exists in the cart, increase the quantity
    return state.map(item =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    // If the product is not in the cart, add it with quantity 1
    return [...state, { product, quantity: 1 }];
  }
}

function removeFromCartReducer(state: CartItem[], productId: string): CartItem[] {
  const existingItem = state.find(item => item.product.id === productId);

  if (existingItem && existingItem.quantity > 1) {
    // If the product has a quantity greater than 1, decrease the quantity
    return state.map(item =>
      item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  } else {
    // If the product has a quantity of 1 or is not in the cart, remove it
    return state.filter(item => item.product.id !== productId);
  }
}
