import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  files: File[];
  numSquare = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  constructor() {
    this.files = [];
  }

	onSelect(event: any) {
    console.log(event);
    
		this.files.push(...event.addedFiles);
	}

	onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  dragDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

}
