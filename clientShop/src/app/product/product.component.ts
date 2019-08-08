import {Component, OnInit} from '@angular/core';
import {Product} from './Product';
import {RestService} from '../rest.service';
import {DomSanitizer} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductComponent implements OnInit {
  products: Product[];
  columnsToDisplay = ['productName', 'price'];
  expandedProduct: Product | null;
  constructor(private restService: RestService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.restService.getProducts()
      .subscribe(products => this.products = products);
  }

  sanitize(encodeImage: string) {
    return this.sanitizer.bypassSecurityTrustUrl(encodeImage);
  }
}
