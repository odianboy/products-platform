import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../../core/types/product.interface';
import { ProductDataMockService } from '../../product/services/product-data-mock.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  private _goods$: BehaviorSubject<IProduct[]>;
  goods$: Observable<IProduct[]>;

  constructor(private mockDataService: ProductDataMockService) {
    this._goods$ = new BehaviorSubject( this.mockDataService.generateRandomProducts() );
    this.goods$ = this._goods$.asObservable();
  }

  getProductByCode(code: number): Observable<IProduct> {    
    const _goods = this._goods$.getValue();
    let product = _goods.find( value => value.code === code );
    
    return of(product as IProduct);
  }

  createProduct(product: IProduct, actualGoods: IProduct[]): Observable<IProduct[]> {
    const _goods = [...actualGoods];
    _goods.unshift(product);
    this._goods$.next(_goods);

    return of(_goods);
  }

  sortGoods(sort: Boolean, actualGoods: IProduct[]): Observable<IProduct[]> {
    const _goods = [...actualGoods];
    _goods.sort( (a, b) => sort ? (a.price) - (b.price) : (b.price) - (a.price) );

    return of(_goods);
  }

  filterGoods(brand: Boolean, actualGoods: IProduct[]): Observable<IProduct[]> {
    const _goods = [...actualGoods];

    if(!brand) {
      let goods = _goods.filter(value => value.brand !== 'Nike');
      return of(goods);
    }
    
    return of(this._goods$.getValue());
  }
}
