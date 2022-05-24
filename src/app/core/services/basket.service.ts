import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket$: Observable<IProduct[]>;
  private _basket$: BehaviorSubject<IProduct[]>;

  constructor() {
    this._basket$ = new BehaviorSubject([] as IProduct[]);
    this.basket$ = this._basket$.asObservable();
  }

  addBasket(product: IProduct): void {
    const basket = this._basket$.getValue();
    basket.unshift(product);
    
    this._basket$.next(basket);
  }

  delBasket(product: IProduct): void {
    const basket = this._basket$.getValue();
    let products = basket.filter(value => value !== product);
    this._basket$.next(products);
  }
}
