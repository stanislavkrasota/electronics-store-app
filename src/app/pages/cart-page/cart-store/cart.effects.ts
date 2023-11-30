import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addToCart } from './cart.actions';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CartEffects {
  addToCartNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCart),
        tap(() => {
          this.snackBar.open('Item added to cart', 'Dismiss', { duration: 2000 });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
