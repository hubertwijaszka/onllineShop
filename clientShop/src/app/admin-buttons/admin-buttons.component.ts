import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html',
  styleUrls: ['./admin-buttons.component.css']
})
export class AdminButtonsComponent implements OnInit {

  @Input() nr: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToClients() {
    this.router.navigate(['admin-users']);
  }
  gotToOrders() {
    this.router.navigate(['admin-orders']);
  }
  goToProducts() {
    this.router.navigate(['admin-products']);
  }
  goToAddProduct() {
    this.router.navigate(['admin-add-product']);
  }
}
