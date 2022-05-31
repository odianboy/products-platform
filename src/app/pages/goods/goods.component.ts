import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { GoodsService } from 'src/app/core/services/goods.service';

import { BasketService } from 'src/app/core/services/basket.service';
import { FormControl, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { productAction } from 'src/app/core/store/actions/product.action';
import { productsSelector } from 'src/app/core/store/selectors/product.select';


@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  sort: Boolean = false;
  form: FormGroup;

  p: number = 1;

  goods$: Observable<IProduct[] | null>;

  constructor(
    private goodsService: GoodsService,
    private basketService: BasketService,
    private store: Store
    ) {
    this.form = new FormGroup({
      brand: new FormControl(true),
    })
    this.goods$ = this.store.pipe(select(productsSelector))
}

  ngOnInit(): void {
    this.store.dispatch( productAction() );
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
