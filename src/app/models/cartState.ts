import {Product} from "./product";

export interface CartState {
  products: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

