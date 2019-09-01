import {DataSource} from '@angular/cdk/table';
import {ProductCount} from './ProductCount';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer} from '@angular/cdk/collections';
import {catchError, finalize} from 'rxjs/operators';
import {RestService} from '../service/rest.service';

export class CartDataSource implements DataSource<ProductCount> {

  private ProductsSubject = new BehaviorSubject<ProductCount[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private restService: RestService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<ProductCount[]> {
    return this.ProductsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ProductsSubject.complete();
    this.loadingSubject.complete();
  }

  loadProductsCount() {

    this.loadingSubject.next(true);

    this.restService.getProductInCart().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(Products => this.ProductsSubject.next(Products));
  }

}
