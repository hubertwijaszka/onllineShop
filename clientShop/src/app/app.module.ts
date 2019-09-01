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
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import {AuthGaurdService} from './service/auth-gaurd.service';
import {BasicAuthHtppInterceptorService} from './service/basic-auth-interceptor.service';

const appRoutes: Routes = [
  { path: 'cartView', component: CartViewComponent, canActivate: [AuthGaurdService]},
  {path: '', component: MainViewComponent},
  {path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoriesComponent,
    CartViewComponent,
    MainViewComponent,
    LoginComponent,
    LogoutComponent
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
