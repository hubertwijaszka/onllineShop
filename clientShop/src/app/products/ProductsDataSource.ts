import {DataSource} from '@angular/cdk/table';
import {Product} from './Product';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer} from '@angular/cdk/collections';
import {catchError, finalize} from 'rxjs/operators';
import {RestService} from '../service/rest.service';

export class ProductsDataSource implements DataSource<Product> {

  private ProductsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private restService: RestService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.ProductsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ProductsSubject.complete();
    this.loadingSubject.complete();
  }

  loadProducts(categoryId: number, filter = '',
               sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

    this.loadingSubject.next(true);

    this.restService.getProducts(categoryId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(Products => this.ProductsSubject.next(Products));
  }

}
