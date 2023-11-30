import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartItem, CartState} from "../../models/cartState";
import {Product} from "../../models/product";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {getCartItems} from "./cart-store/cart.selectors";
import {addToCart, clearCart, removeFromCartPerItem, removeFormCartByProductType} from './cart-store/cart.actions';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  totalSum: number = 0;

  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(getCartItems);
    this.calculateTotalSum();
  }

  private calculateTotalSum(): void {
    this.cartItems$.subscribe(items => {
      this.totalSum = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
    });
  }

  addItem(product: Product): void {
    this.store.dispatch(addToCart({ product }));
  }

  removeFromCartPerItem(productId: string): void {
    this.store.dispatch(removeFromCartPerItem({ productId }));
  }

  removeFormCartByProductType(productId: string): void {
    this.store.dispatch(removeFormCartByProductType({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
