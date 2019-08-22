import { Component, OnInit } from '@angular/core';
import {Category} from '../categories/Category';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  title = 'clientShop';
  selectedCategory: Category;
  onCategoryChange(category: Category) {
    this.selectedCategory = category;
  }
  constructor() { }

  ngOnInit() {
  }

}
