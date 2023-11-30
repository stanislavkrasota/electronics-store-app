import {Injectable} from '@angular/core';
import {Product} from "../models/product";
import {faker} from "@faker-js/faker";
import {Observable, of} from "rxjs";
import {SearchParams} from "../pages/shop-page/shop-page.component";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = this.generateRandomProducts(507);

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  private getProducts(pageIndex: number = 0, pageSize: number = 10): Product[] {
    const startIndex: number = pageIndex * pageSize;
    const endIndex: number = startIndex + pageSize;

    return this.products.slice(startIndex, endIndex);
  }

  private generateRandomProduct(): Product {
    return {
      id: faker.datatype.uuid(),
      picture: faker.image.imageUrl(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(50, 1000, 0),
      customerRating: faker.datatype.number({min: 0, max: 5}),
      description: faker.commerce.productDescription(),
      reviews: Array.from({length: faker.datatype.number({min: 0, max: 10})}).map(() => {
        return {userName: faker.person.fullName(), reviewText: faker.lorem.words({min: 5, max: 30})};
      })
    };
  }

  private generateRandomProducts(count: number): Product[] {
    const products: Product[] = [];
    for (let i: number = 0; i < count; i++) {
      products.push(this.generateRandomProduct());
    }
    return products;
  }

  filterProductsByName(params: SearchParams): Observable<Product[]> {
    const {searchTerm, pageIndex, pageSize}: SearchParams = params;
    const filteredProducts: Product[] = this.getProducts(pageIndex, pageSize).filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredProducts);
  }
}
