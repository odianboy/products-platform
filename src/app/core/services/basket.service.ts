import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket$: Observable<Product[]>;
  private _basket$: BehaviorSubject<Product[]>;

  constructor() {
    this._basket$ = new BehaviorSubject([] as Product[]);
    this.basket$ = this._basket$.asObservable();
  }

  addBasket(product: Product): void {
    const basket = this._basket$.getValue();
    basket.unshift(product);
    
    this._basket$.next(basket);
  }
}
