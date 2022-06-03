import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/types/product.interface';

import { FormControl, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { filterGoodsAction, sortGoodsAction } from 'src/app/goods/store/actions/goods.action';
import { goodsSelector } from 'src/app/goods/store/selectors/goods.select';
import { createCartAction } from 'src/app/cart/store/actions/cart.action';


@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {
  
  sort: Boolean = false;
  form: FormGroup;
  page: number = 1;

  goods$: Observable<IProduct[]>;

  constructor(private store: Store) {
    this.form = new FormGroup({
      brand: new FormControl(true),
    });
    this.goods$ = this.store.pipe( select(goodsSelector) );
}

  addProductCart(product: IProduct): void {
    this.store.dispatch( createCartAction({product}) );
  }

  getSortGoods() {
    this.page = 1;
    this.sort = !this.sort;
    this.store.dispatch( sortGoodsAction({sort: this.sort}) )
  }

  getFilterGoods() {
    this.page = 1;
    let value = this.form.getRawValue();
    this.store.dispatch( filterGoodsAction({ filter: value.brand }) );
  }

  get widgetIcon(): string {
    return this.sort ? 'sort' : 'filter_list';
  }
}
