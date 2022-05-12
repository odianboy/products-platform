import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, take, tap } from 'rxjs';
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
  counterControl: FormControl;

  constructor(
      private basketService: BasketService,
      private router: Router
    ) {
    this.basket$ = this.basketService.basket$;
    this.dataBasket = [] as Product[];

    this.basket$.subscribe( (product) => {
      this.dataBasket = product;
    });

    this.counterControl = new FormControl(1)
  }

  displayedColumns = ['name', 'brand', 'price', 'action'];

  getTotalCost() {
    return this.dataBasket.map(t => +t.price).reduce( (acc, value) => acc + value, 0);
  }
  goToProductPage(product: Product): void {

    this.router.navigate(['/product', product.code])
  }

  delProdutBasket(product: Product): void {
    this.basketService.delBasket(product);
  }

  counter(value: any, product: Product) {

   let count = +value.target.value
    
    if (count === 0) {
      this.delProdutBasket(product);
    }
    
  }
}
