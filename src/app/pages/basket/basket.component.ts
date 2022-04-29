import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { BasketService } from 'src/app/core/services/basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  basket$: Observable<Product[]>;
  dataBasket: Product[];

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;
    this.dataBasket = [] as Product[];

    this.basket$.subscribe( (product) => {
      this.dataBasket = product;
    });

  }

  displayedColumns = ['name', 'brand', 'price'];

  getTotalCost() {
    return this.dataBasket.map(t => +t.price).reduce( (acc, value) => acc + value, 0);
  }
}
