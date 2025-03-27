import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  likeProduct() {
    this.product.likes++;
  }

  removeProduct() {
    // тут нужно удалить товар из списка (через emit event)
  }
}
