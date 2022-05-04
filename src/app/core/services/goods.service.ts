import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductDataMockService } from './product-data-mock.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  goods$: Observable<Product[]>;
  private _goods$: BehaviorSubject<Product[]>;

  constructor(private mockDataService: ProductDataMockService) {
    this._goods$ = new BehaviorSubject( this.mockDataService.generateRandomProducts() );
    this.goods$ = this._goods$.asObservable();
  }

  getProduct(sort: Boolean = false): void {
    const goods = this._goods$.getValue();
    goods.sort( (a, b) => sort ? (a.price) - (b.price) : (b.price) - (a.price) );
  }

  addProduct(product: Product): void {
    const goods = this._goods$.getValue();
    goods.unshift(product);

    this._goods$.next(goods);
  }
}
