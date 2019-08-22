import {Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {Product} from './Product';
import {DomSanitizer} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ProductsDataSource} from './ProductsDataSource';
import {RestService} from '../rest.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  selectedCategoryId: number;
  @Input()
  set categoryToDisplay(categoryId: number) {
    if (categoryId != null) {
      this.selectedCategoryId = categoryId;
    } else {
      this.selectedCategoryId = -1;
    }
    this.loadProducts();
  }
  columnsToDisplay = ['productName', 'price'];
  expandedProduct: Product | null;
  dataSource: ProductsDataSource;
  @ViewChild('input', {static: false}) input: ElementRef;

  constructor(private sanitizer: DomSanitizer,
              private restService: RestService) {
  }

  ngOnInit() {
    this.dataSource = new ProductsDataSource(this.restService);
    this.selectedCategoryId = -1;
    this.dataSource.loadProducts(-1);
  }
  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.loadProducts();
        })
      )
      .subscribe();
  }


  sanitize(encodeImage: string) {
    return this.sanitizer.bypassSecurityTrustUrl(encodeImage);
  }
  loadProducts() {
    if (this.dataSource == null) {
      this.dataSource = new ProductsDataSource(this.restService);
    }
    if ( this.input != null ) {
      this.dataSource.loadProducts(this.selectedCategoryId, this.input.nativeElement.value);
    }
  }
  addToCart(product: Product) {
    let responeProduct;
    this.restService.addToCart(product)
      .subscribe(response => responeProduct = response);
  }
}


