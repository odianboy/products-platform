import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { noPhoto } from 'src/app/core/const/image-data.const';
import { Image } from 'src/app/core/interfaces/image.interface';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {


  @Input() item: Product;
  @Output() onBasket: EventEmitter<Product>;

  constructor() {
    this.item = {} as Product;
    this.onBasket = new EventEmitter<Product>();
  }

  addBasket(item: Product): void {
    this.onBasket.emit(item);
  }

  public get imageProduct(): string {

    if (typeof this.item.image[0] === 'object') {
      for (let image of this.item.image) {
        return image.urlCover;
      }
    }
    return noPhoto;
  }
}
