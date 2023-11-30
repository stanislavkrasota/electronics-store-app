import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {CartItem, CartState} from "./models/cartState";
import {Observable} from "rxjs";
import {getCartItems} from "./pages/cart-page/cart-store/cart.selectors";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCartEmpty: boolean = true;

  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.store.select(getCartItems).subscribe((items: CartItem[]) => {
      this.isCartEmpty = items.length !== 0;
    });
  }
}
