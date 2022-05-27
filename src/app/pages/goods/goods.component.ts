import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { GoodsService } from 'src/app/core/services/goods.service';

import { BasketService } from 'src/app/core/services/basket.service';
import { FormControl, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { selectAllProducts } from 'src/app/core/state/product/product.selectors';
import { loadProducts } from 'src/app/core/state/product/product.actions';
// import { IAppState } from 'src/app/core/state/app.state';
// import { selectProductList } from 'src/app/core/state/product/product.selectors';
// import { GetProducts } from 'src/app/core/state/product/product.actions';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  goods$: Observable<IProduct[]>;
  sort: Boolean = false;
  form: FormGroup;

  p: number = 1;

  // basketTest$ = this._store.pipe(select(selectProductList))
  
  public allProducts$ = this.store.select(selectAllProducts)

  constructor(
    private goodsService: GoodsService,
    private basketService: BasketService,
    // private _store: Store<IAppState>
    private store: Store
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

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
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
