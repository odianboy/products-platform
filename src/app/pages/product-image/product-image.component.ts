import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {

  files: File[];

  constructor() {
    this.files = [];
  }

  onSelect(event: any) {
    if(this.files.length >= 1) {
      this.files.splice(0,1)
      this.files.push(...event.addedFiles);
    } else {
      this.files.push(...event.addedFiles);
    }
	}

	onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

}
