import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { noPhoto } from 'src/app/core/const/image-data.const';
import { ProductImage } from 'src/app/core/interfaces/image.interface';
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
    this.router.navigate(['/product', productCode])
  }

  public get imageProduct(): string {

    for (let img of this.item.images) {
      
      if(typeof img === 'object') {
        return img.url;
      }
    }
    return noPhoto;
  }

  public get infoButton(): string {
    return this.disabledBtn ? 'В корзине' : 'Добавить в корзину';
  }

  public get iconItem(): string {
    return this.disabledBtn ? 'add_shopping_cart' : 'add';
  }
}
