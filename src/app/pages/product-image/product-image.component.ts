import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {

  @Input() image!: File;
  @Input() numImage!: number;

  @Output() onAdd = new EventEmitter<File>();

  constructor() {}

  addImage(image: File): void{

    this.onAdd.emit(image);
  }
}
