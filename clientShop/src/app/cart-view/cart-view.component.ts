import {Component, Inject, OnInit} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import {RestService} from '../rest.service';
import {ProductCount} from './ProductCount';
import {Product} from '../products/Product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  columnsToDisplay = ['Product Name', 'Product Price', 'Count'];
  dataSource: ProductCount[];
  constructor( private restService: RestService,
               @Inject(DOCUMENT) document) {
    this.getProductInCart();
  }

  getProductInCart(): void {
    this.restService.getProductInCart()
      .subscribe(products => this.dataSource = products);
  }
  ngOnInit() {

  }
  saveProductInCart(event: any): void {
    this.restService.changeInCart(event.target.id, event.target.value)
      .subscribe();
    if (event.target.value === '0') {
      this.getProductInCart();
    }
  }
}
