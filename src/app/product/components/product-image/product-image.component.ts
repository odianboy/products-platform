import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IProductImage } from 'src/app/core/types/image.interface';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {

  @Input() image!: IProductImage;

  @Output() onAdd = new EventEmitter<IProductImage>();
  @Output() onDel = new EventEmitter<IProductImage>();

  constructor() {}

  addImage(image: IProductImage): void {
    this.onAdd.emit(image);
  }

  delImage(image: IProductImage): void {
    this.onDel.emit(image);
  }

  imageOver(event: any) {
    if (!this.checkClassName(event)) {
      event.target.style.background = '#9ecbec';
      event.target.style.border = 'none';
    }
    event.target.style.opacity = '0.5';
  }

  imageLeave(event: any) {
    if (!this.checkClassName(event)) {
      event.target.style.background = '#fff';
      event.target.style.border = 'dotted rgb(0, 0, 0, 0.25)';
    }
    event.target.style.opacity = '1';
  }

  imageDrop(event: any) {
    if (!this.checkClassName(event)) {
      event.target.style.background = '#fff';
      event.target.style.border = 'dotted rgb(0, 0, 0, 0.25)';
    }
    event.target.style.opacity = '1';
  }

  checkClassName(event: any) {
    return event.target.className.includes('coverImage');
  }
}
