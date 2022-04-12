import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Image } from 'src/app/core/interfaces/image.interface';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {

  @Input() image!: Image;
  @Input() numImage!: number;

  @Output() onAdd = new EventEmitter<Image>();

  constructor() {}

  addImage(image: Image): void {
    this.onAdd.emit(image);
  }
}
