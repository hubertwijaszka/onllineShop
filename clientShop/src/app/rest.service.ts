import { Injectable } from '@angular/core';
import {Product} from './products/Product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './categories/Category';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  private productsUrl = 'http://localhost:8080/products';
  private categoriesUrl = 'http://localhost:8080/categories';
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
  getProducts(
    categoryId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Product[]> {

    return this.http.get<Product[]>(this.productsUrl, {
      params: new HttpParams()
        .set('categoryId', categoryId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }
}
