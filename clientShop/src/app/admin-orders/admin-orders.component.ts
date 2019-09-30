import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from '../admin-users/User';
import {Order} from './Order';
import {RestService} from '../service/rest.service';
import {Category} from '../categories/Category';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  columnsToDisplay = ['Order Id', 'User Name', 'Address', 'Completed', 'Delete'];
  dataSource = new MatTableDataSource<Order>();
  selectOrder: Order;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders(): void {
    this.restService.getOrders()
      .subscribe(users => this.dataSource.data = users);
  }

  changeOrder(row: Order) {
    this.selectOrder = this.selectOrder === row ? new Order(-1) : row;
  }

  deleteOrder(orderId: number) {
    this.restService.deleteOrder(orderId.toString())
      .subscribe(x => console.log('Observer got a next value: ' + x),
        err => console.error('Observer got an error: ' + err),
        () => this.getOrders());
  }
}
