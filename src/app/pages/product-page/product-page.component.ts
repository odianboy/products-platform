import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  share,
  Subject,
  switchMap,
  take,
  tap 
} from 'rxjs';

import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductImage } from 'src/app/core/interfaces/image.interface';
import { Photo } from 'src/app/core/services/photo';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

import { ValidationService } from 'src/app/core/services/validation.service';
import { GoodsService } from 'src/app/core/services/goods.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ImageQueueService } from 'src/app/core/services/image-queue.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductDataMockService } from 'src/app/core/services/product-data-mock.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  images$: Observable<ProductImage[]>;
  form: FormGroup;
  photos: ProductImage[];

  fileName: string;
  fileSize: string;

  progressValue: number;
  productData!: Product;

  document!: File;

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
    private ImageQueueService: ImageQueueService,
    private goodsService: GoodsService,
    private mockService: ProductDataMockService,
    private docService: DocumentService,
    private activetedRoute: ActivatedRoute,
    private fb: FormBuilder,
    ) {
      this.images$ = this.ImageQueueService.images$;
      this.form = this.formGroupInit();
      this.photos = [] as ProductImage[];
      this.progressValue = 0;
      this.fileName = '';
      this.fileSize = '';

      this.images$.subscribe(value => {
        this.photos = value

        this.form.patchValue({
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

  formGroupInit(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      price: [null, Validators.required],
      isActive: [true],
      document: [null],
      code: [null],
      images: this.fb.array(
        this.genImageControl()
      )
    })
  }

  addImage(image: ProductImage): void {
    this.ImageQueueService.addImage(image);
  }

  async addImageProduct(event: any) {
    let file = event.target.files[0];

    if (file) {

      if (this.validService.checkSize(file)) {
        return;
      }

      if (await this.validService.checkResolution(file)) {
        return;
      }

      let image = this.ImageQueueService.creationImage(file);
      this.addImage(image);
    }
  }

  delImageProduct(image: ProductImage): void {
    this.ImageQueueService.delImage(image);
  }

  addDocument(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      this.load$.next();
      this.fileName = file.name;
      this.fileSize = this.docService.getSize(file);
      this.document = file;

      this.form.patchValue({
        document: file
      });
    }
  }

  submit() {
    this.form.patchValue({
      code: this.mockService.genNum(100000)}
    );
    const productData: Product = this.form.getRawValue();
    this.goodsService.addProduct(productData);

    console.log(this.form.getRawValue());

    this.form.reset();
    this.ImageQueueService.resetImage();
  }

  drop(event: CdkDragDrop<any>) {
    this.photos[event.previousContainer.data.index] = event.container.data.item;
    this.photos[event.container.data.index] = event.previousContainer.data.item;
  }

  genImageControl() {
    return Array.from({length: 10}, () => this.fb.control(new Photo('')));
  }

  openPdfFile() {

    if (this.document || this.productData?.document) {

      const fileURL = URL.createObjectURL(this.document ?? this.productData?.document);
      window.open(fileURL, '_blank');
    }
    return
  }

  get fileInfo(): string | undefined {
    return this.productData ? this.productData.document?.name : this.fileName;
  }

  get disabledBtn(): boolean {
    return this.productData ? true : false;
  }
}