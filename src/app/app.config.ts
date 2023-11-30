import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {cartReducer} from "./pages/cart-page/cart-store/cart.reducer";
import {AppInitService} from "./services/app-init.service";

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }}

export const appConfig: ApplicationConfig = {
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppInitService]
    },
    provideAnimations(),
    provideStore({cart: cartReducer}),
    provideRouter(routes)
  ]
};
