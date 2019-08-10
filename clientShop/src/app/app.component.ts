import { Component } from '@angular/core';
import {Category} from './categories/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientShop';
  selectedCategory: Category;
  onCategoryChange(category: Category) {
    this.selectedCategory = category;
  }
}
