import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct } from '../../core/types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: Observable<IProduct[]>;
  private _cart$: BehaviorSubject<IProduct[]>;

  constructor() {
    this._cart$ = new BehaviorSubject([] as IProduct[]);
    this.cart$ = this._cart$.asObservable();
  }

  addCart(product: IProduct, actualCart: IProduct[]): Observable<IProduct[]> {
    let cart = cloneDeep(actualCart);
    cart.unshift(product);

    return of(cart);
  }

  removeCart(product: IProduct, actualCart: IProduct[]): Observable<IProduct[]> {
    let _cart = cloneDeep(actualCart);
    let cart = _cart.filter(item => item.code !== product.code);

    return of(cart);
  }
}
