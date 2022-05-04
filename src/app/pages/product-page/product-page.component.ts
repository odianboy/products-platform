import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { distinctUntilChanged, filter, map, Observable, share, Subject, switchMap } from 'rxjs';

import { ImageService } from 'src/app/core/services/image.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { Image } from 'src/app/core/interfaces/image.interface';
import { GoodsService } from 'src/app/core/services/goods.service';
import { LoadingService } from 'src/app/core/services/loading.service';

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
  progressValue: number;

  private readonly load$ = new Subject<void>();

  private readonly response$ = this.load$.pipe(
    switchMap(() => this.loadingService.load()),
    share()
  );

  readonly result$ = this.response$.pipe(
    map(response => (typeof response === "string" ? response : null)),
    distinctUntilChanged()
  );

  readonly loadingProgress$: Observable<number | unknown> = this.response$.pipe(filter(Number.isFinite));

  constructor(
    @Inject(LoadingService) private readonly loadingService: LoadingService,
    private imageService: ImageService,
    private goodsService: GoodsService) {
    this.images$ = this.imageService.images$;
    this.form = this.formGroupInit();
    this.progressValue = 0;

    this.images$.subscribe(value => {
      this.form.patchValue({
        image: value
      }); 
    })

    this.loadingProgress$.subscribe(
      value => {
        this.progressValue = Number(value);
      }
    )
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
  
    if (file) {
      this.load$.next();
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
    this.goodsService.addProduct(productData);

    this.imageService.resetImage();
  }
}
