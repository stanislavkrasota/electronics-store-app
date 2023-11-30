import { Injectable } from '@angular/core';
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private productService: ProductService) {
  }

  Init() {
    return new Promise<void>((resolve) => {
      this.productService.getAllProducts().subscribe(() => {
        resolve();
      })
    });
  }
}
