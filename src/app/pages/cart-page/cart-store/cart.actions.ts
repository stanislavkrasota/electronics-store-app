import { createAction, props } from '@ngrx/store';
import {Product} from "../../../models/product";

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product }>()
);
export const removeFromCartPerItem = createAction('[Cart] Remove from Cart per item', props<{ productId: string }>());
export const removeFormCartByProductType = createAction('[Cart] Remove type product from Cart', props<{ productId: string }>());
export const clearCart = createAction('[Cart] Clear Cart');
