import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  numSquare = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  files: File[];
  form: FormGroup;

  constructor() {
    this.files = [];
    this.form = this.formGroupInit();
  }

  formGroupInit(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      isActive: new FormControl(true)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const productData: Product = this.form.getRawValue();

    console.log(productData);
  }

	onSelect(event: any) {
    this.files.push(...event.addedFiles);
	}

	onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  dragDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

}
