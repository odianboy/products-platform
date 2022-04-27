import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ImageService } from 'src/app/core/services/image.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { Image } from 'src/app/core/interfaces/image.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  images$: Observable<Image[]>
  form: FormGroup;

  fileName = '';
  fileSize = '';

  constructor(private imageService: ImageService, private http: HttpClient) {
    this.images$ = this.imageService.images$;
    this.form = this.formGroupInit();

    this.images$.subscribe(value => {
      this.form.patchValue({
        image: value
      }); 
      
    })
  }

  formGroupInit(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      isActive: new FormControl(true),
      document: new FormControl(null),
      image: new FormControl(null)
    })
  }

  addImageProduct(image: Image): void {
    this.imageService.addImage(image);
  }

  addFile(event: any) {
    let file = event.target.files[0];
    let image = this.imageService.creationImage(file);

    this.addImageProduct(image);
  }

  addDocument(event: any) {
    const file: File = event.target.files[0];
    
    const formData = new FormData();  
    formData.append("thumbnail", file);  
    this.http.post("http://localhost:8080/upload", formData);

    if (file) {
      this.fileName = file.name;
      this.fileSize = Math.ceil(file.size / 1024 / 1024 ) + 'МБ';

      this.form.patchValue({
        document: file
      }); 
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
