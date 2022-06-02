import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../../core/interfaces/product.interface';
import { ProductDataMockService } from '../../product/services/product-data-mock.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  private _goods$: BehaviorSubject<IProduct[]>;
  goods$: Observable<IProduct[]>;
  initalGoods$: BehaviorSubject<IProduct[]>;

  constructor(private mockDataService: ProductDataMockService) {
    this._goods$ = new BehaviorSubject( this.mockDataService.generateRandomProducts() );
    this.goods$ = this._goods$.asObservable();
    this.initalGoods$ = new BehaviorSubject( this._goods$.getValue() );
  }

  getProductByCode(code: number): Observable<IProduct> {
    let _goods = this.initalGoods$.getValue();
    let product = _goods.find( value => value.code === code );
    
    return of( product as IProduct);
  }

  createProduct(product: IProduct, actualGoods: IProduct[]): Observable<IProduct[]> {
    let _goods = cloneDeep(actualGoods);
    _goods.unshift(product);

    return of(_goods);
  }

  sortGoods(sort: Boolean, actualGoods: IProduct[]): Observable<IProduct[]> {
    const _goods = cloneDeep(actualGoods);
    _goods.sort( (a, b) => sort ? (a.price) - (b.price) : (b.price) - (a.price) );

    return of(_goods);
  }

  filterGoods(brand: Boolean, actualGoods: IProduct[]): Observable<IProduct[]> {
    const _goods = cloneDeep(actualGoods);

    if(!brand) {
      let goods = _goods.filter(value => value.brand !== 'Nike');
      return of(goods);
    }
    
    return of(this.initalGoods$.getValue());
  }
}
