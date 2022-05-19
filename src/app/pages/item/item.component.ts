import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { noImage } from 'src/app/core/const/product-data.const';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  disabledBtn: boolean;

  @Input() item: Product;
  @Output() onBasket: EventEmitter<Product>;

  constructor(private router: Router) {
    this.item = {} as Product;
    this.onBasket = new EventEmitter<Product>();
    this.disabledBtn = false;
  }

  addBasket(item: Product): void {
    this.disabledBtn = true;
    this.onBasket.emit(item);
  }

  goToProductPage(item: Product): void {
    const productCode = item ? item.code : null;

    this.router.navigate(['/product', productCode]);
  }

  public get imageProduct(): string {

    for (let image of this.item.images) {
      if(image.url) {
        return image.url
      }
    }
    return noImage;
  }

  public get infoButton(): string {
    return this.disabledBtn ? 'В корзине' : 'Добавить в корзину';
  }

  public get iconItem(): string {
    return this.disabledBtn ? 'add_shopping_cart' : 'add';
  }
}
