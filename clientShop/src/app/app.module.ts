import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatGridListModule} from '@angular/material';
import { CategoriesComponent } from './categories/categories.component';
import { MatInputModule } from '@angular/material/input';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import {AuthGaurdService} from './service/auth-gaurd.service';
import {BasicAuthHtppInterceptorService} from './service/basic-auth-interceptor.service';
import { RegistrationComponent } from './registration/registration.component';
import { AdminButtonsComponent } from './admin-buttons/admin-buttons.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const appRoutes: Routes = [
  { path: 'cartView', component: CartViewComponent, canActivate: [AuthGaurdService]},
  {path: '', component: MainViewComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'admin-users', component: AdminUsersComponent, canActivate: [AuthGaurdService]},
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGaurdService]},
  { path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGaurdService]},
  { path: 'admin-add-product', component: AdminAddProductComponent, canActivate: [AuthGaurdService]}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoriesComponent,
    CartViewComponent,
    MainViewComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    AdminButtonsComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminAddProductComponent,
    ResetPasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
