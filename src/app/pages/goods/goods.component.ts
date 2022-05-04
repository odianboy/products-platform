import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { GoodsService } from 'src/app/core/services/goods.service';

import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {

  goods$: Observable<Product[]>;
  sort: Boolean = false;

  constructor(
    private goodsService: GoodsService,
    private basketService: BasketService) {

    this.goods$ = this.goodsService.goods$;
  }

  addItemBasket(product: Product): void {
    this.basketService.addBasket(product);
  }

  getProduct() {
    this.sort = !this.sort;
    this.goodsService.getProduct(this.sort);
  }

  get widgetIcon(): string {
    return this.sort ? 'sort' : 'filter_list';
  }
}
