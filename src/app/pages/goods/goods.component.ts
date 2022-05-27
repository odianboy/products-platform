import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { GoodsService } from 'src/app/core/services/goods.service';

import { BasketService } from 'src/app/core/services/basket.service';
import { FormControl, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { selectProductList } from 'src/app/core/store/selectors/product.selector';
import { GetProducts } from 'src/app/core/store/actions/product.action';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {

  goods$: Observable<IProduct[]>;
  sort: Boolean = false;
  form: FormGroup;

  p: number = 1;

  basketTest$ = this._store.pipe(select(selectProductList))

  constructor(
    private goodsService: GoodsService,
    private basketService: BasketService,
    private _store: Store<IAppState>
    ) {
      this.form = new FormGroup({
        brand: new FormControl(true),
      })
      this.goods$ = this.goodsService.goods$;

      // this._store.dispatch(new GetProducts())

      // this.basketTest$.subscribe(value => {
      //   console.log('це стор', value)
      // })
  }

  addItemBasket(product: IProduct): void {
    this.basketService.addBasket(product);
  }

  getProduct() {
    this.p = 1;
    this.sort = !this.sort;
    this.goodsService.getProduct(this.sort);
  }

  submit() {
    this.p = 1;
    let value = this.form.getRawValue();
    this.goodsService.filterProduct(value.brand);
  }

  get widgetIcon(): string {
    return this.sort ? 'sort' : 'filter_list';
  }
}
