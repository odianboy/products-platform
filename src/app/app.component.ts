import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartAction } from './cart/store/actions/cart.action';
import { goodsAction } from './goods/store/actions/goods.action';
import { productAction } from './product/store/actions/product.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'products-platform';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch( goodsAction() );
    this.store.dispatch( cartAction() );
    this.store.dispatch( productAction() );
  }
}
