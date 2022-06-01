import { Injectable } from '@angular/core';
import { cloneDeep, isEmpty } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { ProductDataMockService } from './product-data-mock.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  goods$: Observable<IProduct[]>;
  private _goods$: BehaviorSubject<IProduct[]>;
  products$: BehaviorSubject<IProduct[]>;

  constructor(private mockDataService: ProductDataMockService) {
    this._goods$ = new BehaviorSubject( this.mockDataService.generateRandomProducts() );
    this.goods$ = this._goods$.asObservable();
    this.products$ = new BehaviorSubject([] as IProduct[]);
  }

  getProductByCode(code: number): Observable<IProduct> {
    let goods = this.products$.getValue();
    let product = goods.find( value => value.code === code );
    return of( product as IProduct);
  }

  addProduct(product: IProduct, products: IProduct[]): Observable<IProduct[]> {
    let goods = cloneDeep(products);
    goods.unshift(product);
    this.getGoods(goods);

    return of(goods);
  }

  getGoods(product: IProduct[]=[]) {
    if ( !isEmpty(product) ) {
      this._goods$.next([]);
      this._goods$.next(product);
    }
    let goods = this._goods$.getValue();

    this.products$.next([]);
    this.products$.next(goods);

    return of(goods);
  }

  sortGoods(sort: Boolean, actualGoods: IProduct[]): Observable<IProduct[]> {
    const products = cloneDeep(actualGoods);
    products.sort( (a, b) => sort ? (a.price) - (b.price) : (b.price) - (a.price) );

    return of(products);
  }

  filterGoods(brand: Boolean, actualGoods: IProduct[]): Observable<IProduct[]> {
    const goods = cloneDeep(actualGoods);

    if(!brand) {
      let product = goods.filter(value => value.brand !== 'Nike');
      return of(product);
    } else {
      return of(this.products$.getValue());
    }
  }

  // addProduct(product: IProduct): void {
  //   const goods = this._goods$.getValue();
  //   goods.unshift(product);

  //   this._goods$.next(goods);
  // }

  // filterProduct(brand: Boolean): void {
  //   const goods = this._goods$.getValue();

  //   if(!brand) {
  //     let product = goods.filter(value => value.brand !== 'Nike');
  //     this._goods$.next(product);
  //   } else {
  //     this._goods$.next(this.product);
  //   }
  // }

  // getProduct(sort: Boolean = false): void {
  //   const goods = this._goods$.getValue();
  //   goods.sort( (a, b) => sort ? (a.price) - (b.price) : (b.price) - (a.price) );
  // }
}
