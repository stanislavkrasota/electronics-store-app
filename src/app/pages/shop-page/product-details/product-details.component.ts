import {Component, Inject, Input, Optional} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Product} from "../../../models/product";
import {MatCardModule} from "@angular/material/card";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

export interface DetailsConfig {
  product: Product;
  expanded: boolean;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgOptimizedImage, MatIconModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  isExpanded: boolean = false;
  @Input() product!: Product;

  constructor(
    @Optional() public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) private data: DetailsConfig
  ) {
    if (this.data) {
      this.isExpanded = this.data.expanded;
      this.product = this.data.product;
    }
  }
}
