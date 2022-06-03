import { Component, Inject, OnInit } from '@angular/core';
import {
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
  lastValueFrom,
  debounceTime
} from 'rxjs';
import { IProduct } from 'src/app/core/types/product.interface';
import { IProductImage } from 'src/app/core/types/image.interface';
import { Photo } from 'src/app/product/services/photo-form';

import { ActivatedRoute } from '@angular/router';

import { ValidationService } from 'src/app/product/services/validation.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ImageQueueService } from 'src/app/product/services/image-queue.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductDataMockService } from 'src/app/product/services/product-data-mock.service';

import { select, Store } from '@ngrx/store';
import { createProductAction } from 'src/app/goods/store/actions/goods.action';
import { productSelector } from '../../store/selectors/product.selector';
import { fillProductAction } from '../../store/actions/product.action';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit{
  images$: Observable<IProductImage[]>;
  form: FormGroup;
  photos: IProductImage[];

  fileSize: string;

  progressValue: number;
  productDataRoute!: IProduct;
  product$: Observable<IProduct | null>;
  product: IProduct;

  document: File;

  private readonly load$ = new Subject<void>();

  private readonly response$ = this.load$.pipe(
    switchMap(() => this.loadingService.load()),
    share(),
  );

  readonly result$ = this.response$.pipe(
    map(response => (typeof response === "string" ? response : null)),
    distinctUntilChanged(),
  );

  readonly loadingProgress$: Observable<number | unknown> = this.response$.pipe(filter(Number.isFinite));

  constructor(
    @Inject(LoadingService) private readonly loadingService: LoadingService,
    private validService: ValidationService,
    private ImageQueueService: ImageQueueService,
    private mockService: ProductDataMockService,
    private docService: DocumentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    ) {
      this.images$ = this.ImageQueueService.images$;
      this.form = this.formGroupInit();
      this.photos = [] as IProductImage[];
      this.document = {} as File;
      this.product = {} as IProduct;
      this.progressValue = 0;
      this.fileSize = '';
      this.product$ = this.store.pipe( select(productSelector) );

      this.images$.subscribe(value => {
        this.photos = value;

        this.form.patchValue({
          images: this.photos,
        });
      });

      this.productDataRoute = route.snapshot.data['product'];
      this.form.patchValue(this.productDataRoute);

      this.loadingProgress$.subscribe(
        value => {
          this.progressValue = Number(value);
        }
      );

      this.form.valueChanges.pipe(
        debounceTime(1000),
      ).subscribe(
        value => {
          this.store.dispatch( fillProductAction({product: value}) )
        }
      );
    }

  ngOnInit(): void {

    if (!this.productDataRoute) {
      this.product$.subscribe(
        value => {
          this.product = value as IProduct
        }
      );
      this.form.patchValue(this.product as IProduct);
    }
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

  addImage(image: IProductImage): void {
    this.ImageQueueService.addImage(image);
  }

  async addImageProduct(event: any) {
    let file = event.target.files[0];

    if (file) {
      if (await lastValueFrom(this.validService.syncValidate(file))) {
        return
      }

      let image = this.ImageQueueService.creationImage(file);
      this.addImage(image);
    }
  }

  delImageProduct(image: IProductImage): void {
    this.ImageQueueService.delImage(image);
  }

  addDocument(event: any): void {
    const file: File = event.target.files[0];
  
    if (file) {
      this.load$.next();
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
    const productData: IProduct = this.form.getRawValue();
    this.store.dispatch( createProductAction({product: productData}) );
    
    console.log(this.form.getRawValue());

    this.form.reset();
    this.ImageQueueService.resetImage();
  }

  genImageControl(): Array<FormControl> {
    return Array.from({length: 10}, () => this.fb.control(new Photo('')));
  }

  openPdfFile(): void {
    if (this.product.document || this.productDataRoute?.document) {
      const fileURL = URL.createObjectURL(this.product.document ?? this.productDataRoute?.document);
      window.open(fileURL, '_blank');
    }
    return
  }

  get fileInfo(): string | undefined {
    return this.productDataRoute ? this.productDataRoute.document?.name : this.product.document?.name;
  }

  get disabledBtn(): boolean {
    return this.productDataRoute ? true : false;
  }

  returnUpdatedList(data: IProductImage[]): void {
    this.photos = data;

    this.form.patchValue({
      images: this.photos
    }); 
  }
}