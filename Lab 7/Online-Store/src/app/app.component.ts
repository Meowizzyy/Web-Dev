import { Component } from '@angular/core';
import { ProductCardComponent } from '../product/product-card.component';
import { PRODUCTS } from '../product/products';
import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ProductCardComponent,CommonModule] 
})
export class AppComponent {
  products: Product[] = PRODUCTS;
}
