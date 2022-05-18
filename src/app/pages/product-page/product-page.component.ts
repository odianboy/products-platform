import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { distinctUntilChanged, filter, map, Observable, share, Subject, switchMap, take, tap } from 'rxjs';

import { ImageService } from 'src/app/core/services/image.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductImage } from 'src/app/core/interfaces/image.interface';
import { GoodsService } from 'src/app/core/services/goods.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ProductDataMockService } from 'src/app/core/services/product-data-mock.service';
import { ActivatedRoute } from '@angular/router';

import { ValidationService } from 'src/app/core/services/validation.service';
import { Photo } from 'src/app/core/services/photo';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  images$: Observable<ProductImage[]>
  form: FormGroup;
  photos!: ProductImage[];

  fileName = '';
  fileSize = '';
  progressValue: number;

  productData!: Product;
  pdfFile!: File;

  private readonly load$ = new Subject<void>();

  private readonly response$ = this.load$.pipe(
    switchMap(() => this.loadingService.load()),
    share(),
  );

  readonly result$ = this.response$.pipe(
    map(response => (typeof response === "string" ? response : null)),
    distinctUntilChanged()
  );

  readonly loadingProgress$: Observable<number | unknown> = this.response$.pipe(filter(Number.isFinite));

  constructor(
    @Inject(LoadingService) private readonly loadingService: LoadingService,
    private validService: ValidationService,
    private imageService: ImageService,
    private goodsService: GoodsService,
    private mockService: ProductDataMockService,
    private activetedRoute: ActivatedRoute,
    private fb: FormBuilder,
    ) {
      this.images$ = this.imageService.images$;
      this.form = this.formGroupInit();
      this.progressValue = 0;

      this.images$.subscribe(value => {
        this.photos = value
        this.form.patchValue({
          // image: this.photos,
          images: this.photos,
        }); 
      });

      this.loadingProgress$.subscribe(
        value => {
          this.progressValue = Number(value);
      }
    );
    
    this.activetedRoute.data.pipe(
      map(data => data['product']),
      tap(data => {
        this.productData = data ? data : null;
        this.form.patchValue(data)
      }),
      take(1)
      ).subscribe();
  }

  genImgageControl() {
    return Array.from({length: 10}, () => this.fb.control(new Photo('')));
  }

  formGroupInit(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      price: [null, Validators.required],
      isActive: [true],
      document: [null],
      // image: [null],
      code: [this.mockService.genNum(100000)],
      images: this.fb.array(
        this.genImgageControl()
      )
    })
  }

  get imagesArray(): FormArray {
    return this.form.controls['images'] as FormArray;
  }

  addImageProduct(image: ProductImage): void {
    this.imageService.addImage(image);

    // const img = this.fb.group({
    //   imgControl: [image]
    // })

    // this.imagesArray.push(img)
  }

  delImageProduct(image: ProductImage): void {
    this.imageService.delImage(image);
  }

  async addFile(event: any) {
    let file = event.target.files[0];

    if (file) {

      if (this.validService.checkSize(file)) {
        return;
      }

      if (await this.validService.checkResolution(file)) {
        return;
      }

      let image = this.imageService.creationImage(file);
      this.addImageProduct(image);
    }
  }

  addDocument(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      this.load$.next();
      this.fileName = file.name;
      this.fileSize = Math.ceil(file.size / 1024 / 1024 ) + 'МБ';
      this.pdfFile = file;

      this.form.patchValue({
        document: file
      }); 
    }
  }

  submit() {
    const productData: Product = this.form.getRawValue();   
    this.goodsService.addProduct(productData);


    console.log(this.form.getRawValue());
    

    this.imageService.resetImage();
    this.form.reset();
  }

  drop(event: CdkDragDrop<any>) {
    this.photos[event.previousContainer.data.index] = event.container.data.item;
    this.photos[event.container.data.index] = event.previousContainer.data.item;
  }

  get fileInfo(): string | undefined {
    return this.productData ? this.productData.document?.name : this.fileName;
  }

  get disabledBtn(): boolean {
    return this.productData ? true : false;
  }

  openPdfFile() {

  }

}