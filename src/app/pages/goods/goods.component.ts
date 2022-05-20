import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { GoodsService } from 'src/app/core/services/goods.service';

import { BasketService } from 'src/app/core/services/basket.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {

  goods$: Observable<Product[]>;
  sort: Boolean = false;
  form: FormGroup;

  p: number = 1;

  constructor(
    private goodsService: GoodsService,
    private basketService: BasketService) {
      this.form = new FormGroup({
        brand: new FormControl(true),
      })
      this.goods$ = this.goodsService.goods$;
  }

  addItemBasket(product: Product): void {
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
