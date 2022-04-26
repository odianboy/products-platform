import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ImageService } from 'src/app/core/services/image.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { Image } from 'src/app/core/interfaces/image.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  images$: Observable<Image[]>
  form: FormGroup;

  fileName = '';

  constructor(private imageService: ImageService) {
    this.images$ = this.imageService.images$;
    this.form = this.formGroupInit();
  }

  formGroupInit(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      isActive: new FormControl(true),
      file: new FormControl(),
    })
  }

  addImageProduct(image: any): void{
    this.imageService.addImage(image);
  }

  addFile(event: any) {
    console.log(event);
    let file = event.target.files[0];
    let image = this.imageService.creationImage(file);
    this.addImageProduct(image);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        const formData = new FormData();
        formData.set("test", file);
 
        console.log(file);
      
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const productData: Product = this.form.getRawValue();
    console.log(productData);
  }
}
