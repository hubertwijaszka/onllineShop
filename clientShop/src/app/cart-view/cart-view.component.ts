import {Component, Inject, Input, OnInit} from '@angular/core';

import {DOCUMENT} from '@angular/common';
import {RestService} from '../service/rest.service';
import {ProductCount} from './ProductCount';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {User} from '../admin-users/User';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  columnsToDisplay = ['Product Name', 'Product Price', 'Count'];
  dataSource = new MatTableDataSource<ProductCount>();
  @Input() isAdmin = false;
  orderId = -1;
  @Input()
  set orderToDisplay(orderId: number) {
    if (orderId != null) {
      this.orderId = orderId;
    } else {
      this.orderId = -1;
    }
    this.getProductInCart();
  }

  constructor(private restService: RestService,
              @Inject(DOCUMENT) document,
              private router: Router) {}

  getProductInCart(): void {
    this.restService.getProductInCart(this.orderId)
      .subscribe(products => this.dataSource.data = products);
  }

  ngOnInit() {
    this.getProductInCart();
  }

  saveProductInCart(event: any): void {
    this.restService.changeInCart(event.target.id, event.target.value)
      .subscribe({
        complete() {
          if (event.target.value === '0') {
            this.getProductInCart();
          }
        }
      });
  }

  buy() {
    this.restService.buy()
      .subscribe();
  }
}
