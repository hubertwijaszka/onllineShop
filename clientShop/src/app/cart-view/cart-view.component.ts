import { Component, OnInit } from '@angular/core';

import {CartDataSource} from './CartDataSource';
import {RestService} from '../rest.service';
import {ProductCount} from './ProductCount';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  columnsToDisplay = ['Product Name', 'Product Price', 'Count', 'Buttons'];
  dataSource: ProductCount[];
  constructor( private restService: RestService) {
    this.getProductInCart();
  }

  getProductInCart(): void {
    this.restService.getProductInCart()
      .subscribe(products => this.dataSource = products);
  }
  ngOnInit() {

  }

}
