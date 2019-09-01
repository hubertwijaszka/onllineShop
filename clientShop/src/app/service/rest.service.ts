import { Injectable } from '@angular/core';
import {Product} from '../products/Product';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../categories/Category';
import {ProductCount} from '../cart-view/ProductCount';
import {map} from 'rxjs/operators';

export class User {
  constructor(
    public status: string,
  ) {}

}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private productsUrl = 'http://localhost:8080/free/products';
  private categoriesUrl = 'http://localhost:8080/free/categories';
  private addToCartUrl = 'http://localhost:8080/addToCart';
  private getProductFromCartUrl = 'http://localhost:8080/getProductsInCart';
  private changeProductInCartUrl = 'http://localhost:8080/changeProductInCart';
  private  loginUrl = 'http://localhost:8080/validateLogin';
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
  changeInCart(productId: string, count = 1) {
    return this.http.get<Product[]>(this.changeProductInCartUrl, {
      params: new HttpParams()
        .set('productId', productId)
        .set('count', count.toString())
    });
  }
  login(model: any) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(model.username + ':' + model.password)});
    return this.http.get<User>(this.loginUrl, {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', model.username);
          const authString = 'Basic ' + btoa(model.username  + ':' + model.password);
          sessionStorage.setItem('basicauth', authString);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
  }
}
