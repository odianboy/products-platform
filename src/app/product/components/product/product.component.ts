import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { noImage } from 'src/app/core/const/product-data.const';
import { IProduct } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  disabledBtn: boolean;

  @Input() item: IProduct;
  @Output() onBasket: EventEmitter<IProduct>;

  constructor(private router: Router) {
    this.item = {} as IProduct;
    this.onBasket = new EventEmitter<IProduct>();
    this.disabledBtn = false;
  }

  addBasket(item: IProduct): void {
    this.disabledBtn = true;
    this.onBasket.emit(item);
  }

  goToProductPage(item: IProduct): void {
    const productCode = item ? item.code : null;

    this.router.navigate(['/product', productCode]);
  }

  public get imageProduct(): ArrayBuffer | string {

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
