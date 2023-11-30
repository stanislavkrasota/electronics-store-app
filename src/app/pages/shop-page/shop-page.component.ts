import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatGridListModule} from "@angular/material/grid-list";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Dialog, DialogModule, DialogRef} from "@angular/cdk/dialog";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CartState} from "../../models/cartState";
import {Store} from "@ngrx/store";
import {addToCart} from "../cart-page/cart-store/cart.actions";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, switchMap} from "rxjs";
import {tap} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export class SearchParams {
  searchTerm: string = '';
  pageIndex: number = 0;
  pageSize: number = 10;
  constructor(searchTerm?: string  , pageIndex?: number, pageSize?: number) {
    this.searchTerm = searchTerm || '';
    this.pageIndex = pageIndex || 0;
    this.pageSize = pageSize || 10;
  }
}

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DialogModule, ProductDetailsComponent, MatInputModule, MatPaginatorModule],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ShopPageComponent implements OnInit, OnDestroy {
  pageSize: number = 10;
  pageIndex: number = 0;
  totalItems: number = 0;
  pageSizeOptions: number[] = [10, 25, 50];
  products: Observable<Product[]>|undefined;

  private searchSubject: BehaviorSubject<SearchParams> = new BehaviorSubject<SearchParams>(new SearchParams());
  private productService: ProductService = inject(ProductService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatInput) searchInput!: MatInput;

  constructor(private dialog: Dialog, private store: Store<CartState>) {}

  ngOnInit(): void {
    this.getTotalItems();
    this.searchInit();
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }

  private getTotalItems(): void {
    this.productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(_ => {
      this.totalItems = _.length;
    });
  }

  private searchInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.paginator.pageIndex = 0),
      switchMap((params: SearchParams) => this.products = this.filterProducts(params))
    ).subscribe();
  }


  search(event: Event | null): void {
    const el: HTMLInputElement|null = event?.target as HTMLInputElement | null;
    const searchParams: SearchParams = new SearchParams(el?.value || '');
    this.searchSubject.next(searchParams);
  }

  private filterProducts(params: SearchParams): Observable<Product[]> {
    return this.productService.filterProductsByName(params).pipe(
      tap(filteredProducts => {
        return filteredProducts;
      })
    );
  }

  onPageChange(event: PageEvent): void {
    this.totalItems = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const searchParams: SearchParams = new SearchParams(this.searchInput.value, event.pageIndex, this.pageSize)
    this.products = this.filterProducts(searchParams);
  }

  openDetailsDialog(product: Product) {
    const dialogRef: DialogRef<string> = this.dialog.open<string>(ProductDetailsComponent, {
      data: { product, expanded: true },
      width: '600px',
      closeOnNavigation: true,
    });

    dialogRef.closed.subscribe((result: Product['id'] | undefined) => {
      if (result === product.id) {
        this.store.dispatch(addToCart({ product }));
      }
      console.log('The dialog was closed');
    });
  }
}
