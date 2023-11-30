import { createFeatureSelector, createSelector } from '@ngrx/store';
import {CartItem} from "../../../models/cartState";

const getCartState = createFeatureSelector<CartItem[]>('cart');

export const getCartItems = createSelector(getCartState, (state: CartItem[]) => state);
