import { Injectable } from '@angular/core';
import {Product} from './products/Product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './categories/Category';
import {ProductCount} from './cart-view/ProductCount';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  private productsUrl = 'http://localhost:8080/products';
  private categoriesUrl = 'http://localhost:8080/categories';
  private addToCartUrl = 'http://localhost:8080/addToCart';
  private getProductFromCartUrl = 'http://localhost:8080/getProductsFromCart';
  authenticated = false;
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
  getProductInCart(): Observable<ProductCount[]> {
    return this.http.get<ProductCount[]>(this.getProductFromCartUrl);
  }

    addToCart(product: Product, count = 1) {
     return this.http.get<Product[]>(this.addToCartUrl, {
       params: new HttpParams()
         .set('productId', product.prodId.toString())
         .set('count', count.toString())
         .set('productName', product.productName.toString())
         .set('productPrice', product.price.toString())
     });
  }
}
