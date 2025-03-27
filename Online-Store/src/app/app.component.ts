import { Component } from '@angular/core';
import { CATEGORIES } from '../../data/categories';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports : [ProductListComponent,CommonModule]
})
export type CategoryKey = 'smartphones' | 'laptops' | 'tablets' | 'accessories';

export class AppComponent {
  categories: CategoryKey[] = Object.keys(CATEGORIES) as CategoryKey[];
  selectedCategory: CategoryKey | null = null;

  selectCategory(category: CategoryKey) {
    this.selectedCategory = category;
  }
}


