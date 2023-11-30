import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {cartReducer} from "./pages/cart-page/cart-store/cart.reducer";

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideStore({cart: cartReducer}), provideRouter(routes)]
};
