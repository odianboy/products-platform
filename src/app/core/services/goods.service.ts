import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { ProductDataMockService } from './product-data-mock.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  goods$: Observable<IProduct[]>;
  private _goods$: BehaviorSubject<IProduct[]>;
  product: IProduct[];

  constructor(private mockDataService: ProductDataMockService) {
    this._goods$ = new BehaviorSubject( this.mockDataService.generateRandomProducts() );
    this.goods$ = this._goods$.asObservable();
    this.product = this._goods$.getValue();
  }

  getProduct(sort: Boolean = false): void {
    const goods = this._goods$.getValue();
    goods.sort( (a, b) => sort ? (a.price) - (b.price) : (b.price) - (a.price) );
  }

  getProductByCode(code: number): Observable<IProduct> {
    
    let product = this.product.find( value => value.code === code );
    return of( product as IProduct);
  }

  addProduct(product: IProduct): Observable<IProduct[]> {
    console.log(product);
    
    const goods = this._goods$.getValue();
    goods.unshift(product);
    this._goods$.next(goods);

    return this.goods$
  }

  filterProduct(brand: Boolean): void {
    
    const goods = this._goods$.getValue();

    if(!brand) {
      let product = goods.filter(value => value.brand !== 'Nike');
      this._goods$.next(product);
    } else {
      this._goods$.next(this.product);
    }
  }
}
