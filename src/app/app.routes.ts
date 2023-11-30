import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'shop',
    loadComponent: () =>
      import('./pages/shop-page/shop-page.component').then((x) => x.ShopPageComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart-page/cart-page.component').then((x) => x.CartPageComponent),
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((x) => x.NotFoundComponent),
  }
];
