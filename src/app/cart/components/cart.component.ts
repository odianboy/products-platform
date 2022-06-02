import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { select, Store } from '@ngrx/store';
import { cartSelector } from '../store/selectors/cart.selector';
import { removeCartAction } from '../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart$: Observable<IProduct[]>;
  counterControl: FormControl;
  displayedColumns = ['name', 'brand', 'price', 'action'];

  constructor(private router: Router, private store: Store) {
    this.counterControl = new FormControl(1)
    this.cart$ = this.store.pipe( select(cartSelector) );
  }

  getTotalCost(cart: IProduct[]) {
    return cart.map(t => +t.price).reduce( (acc, value) => acc + value, 0);
  }

  goToProductPage(product: IProduct): void {
    this.router.navigate(['/product', product.code]);
  }

  removeProdutCart(product: IProduct): void {
    this.store.dispatch( removeCartAction({product}) );
  }

  counter(value: any, product: IProduct) {
   const count = +value.target.value;

    if (count === 0) {
      this.store.dispatch( removeCartAction({product}) );
    }
  }
}
