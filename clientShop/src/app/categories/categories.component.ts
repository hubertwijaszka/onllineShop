import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from '../rest.service';
import {Category} from './Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  columnsToDisplay = ['Categories'];
  selectCategory: Category;
  @Output() categoryChange = new EventEmitter<Category>();
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void {
    this.restService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
  changeCategory(category: Category): void {
    this.selectCategory = this.selectCategory === category ? new Category(-1) : category;
    this.categoryChange.emit(this.selectCategory);
  }
}
