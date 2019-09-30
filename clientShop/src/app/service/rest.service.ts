import {Injectable} from '@angular/core';
import {Product} from '../products/Product';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../categories/Category';
import {ProductCount} from '../cart-view/ProductCount';
import {map} from 'rxjs/operators';
import {User} from '../admin-users/User';
import {Order} from '../admin-orders/Order';

export class Confirmation {
  constructor(
    public status: string,
  ) {
  }

}
export class ProductAndFile {
  constructor(
    public product: Product,
    public file: File
  ) {
  }

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
  private loginUrl = 'http://localhost:8080/validateLogin';
  private registartionUrl = 'http://localhost:8080/free/registration';
  private buyUrl = 'http://localhost:8080/buy';
  private getUsersUrl = 'http://localhost:8080/getUsers';
  private changeUsersUrl = 'http://localhost:8080/changeUsers';
  private deleteUsersUrl = 'http://localhost:8080/deleteUsers';
  private deleteProductUrl = 'http://localhost:8080/deleteProducts';
  private getOrderUrl = 'http://localhost:8080/getOrders';
  private deleteOrderUrl = 'http://localhost:8080/deleteOrders';
  private uploadProductUrl = 'http://localhost:8080/uploadProduct';
  private isAdminUrl = 'http://localhost:8080/isAdmin';
  private resetPasswordUrl = 'http://localhost:8080/free/resetPassword';
  authenticated = false;

  constructor(private http: HttpClient) {
  }

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

  getProductInCart(orderId: number): Observable<ProductCount[]> {
    return this.http.get<ProductCount[]>(this.getProductFromCartUrl, {
      params: new HttpParams()
        .set('orderId', orderId.toString())
    });
  }

  addToCart(product: Product, count = 1) {
    return this.http.get<Product[]>(this.addToCartUrl, {
      params: new HttpParams()
        .set('productId', product.prodId.toString())
        .set('count', count.toString())
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
    return this.http.get<Confirmation>(this.loginUrl, {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', model.username);
          const authString = 'Basic ' + btoa(model.username + ':' + model.password);
          sessionStorage.setItem('basicauth', authString);
          return userData;
        }
      )
    );
  }
  isAdmin(model: any) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(model.username + ':' + model.password)});
    return this.http.get<Confirmation>(this.isAdminUrl, {headers}).pipe(
      map(
        userData => {
          if (!(userData == null)) {
            sessionStorage.setItem('isAdmin', 'true');
          }
          return userData;
        }
      )
    );
  }

  registartion(model: any) {
    return this.http.get<Confirmation>(this.registartionUrl, {
      params: new HttpParams()
        .set('username', model.username)
        .set('mail', model.mail)
        .set('password', model.password)
    });
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log('user is logged');
    return !(user === null);
  }

  isAdminCheck() {
    const user = sessionStorage.getItem('isAdmin');
    if (!(user === null)) {
      console.log('user have admin rights');
    }
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicauth');
    sessionStorage.removeItem('isAdmin');
  }

  buy() {
    return this.http.get<any>(this.buyUrl);
  }
  deleteOrder(orderId: string) {
    return this.http.get(this.deleteOrderUrl, {
      responseType: 'text',
      params: new HttpParams()
        .set('orderId', orderId)
    });
  }
  getUsers() {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  changeUser(id: string, mail: string) {
    return this.http.get<Confirmation>(this.changeUsersUrl, {
      params: new HttpParams()
        .set('username', id)
        .set('mail', mail)
    });
  }

  deleteUser(username: string) {
    return this.http.get(this.deleteUsersUrl, {
      responseType: 'text',
      params: new HttpParams()
        .set('username', username)
    });
  }

  deleteProduct(product: Product) {
    return this.http.get(this.deleteProductUrl, {
      params: new HttpParams()
        .set('productId', product.prodId.toString()),
      responseType: 'text',
    });
  }
  getOrders() {
    return this.http.get<Order[]>(this.getOrderUrl);
  }

/*  sendProduct(formData: FormData) {
    /!*return this.http.post(this.uploadProductUrl, new ProductAndFile(model, selectedFile));*!/
    return this.http.post<any>(this.uploadProductUrl, formData);
  }*/
  sendProduct(model: Product) {
    return this.http.post(this.uploadProductUrl, model);
  }

  resetPassword(model: any) {
    return this.http.get(this.resetPasswordUrl, {
      responseType: 'text',
      params: new HttpParams()
        .set('username', model.username)
        .set('mail', model.mail)
    });
  }
}
