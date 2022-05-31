import { Component, Inject } from '@angular/core';
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
  lastValueFrom
} from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { IProductImage } from 'src/app/core/interfaces/image.interface';
import { Photo } from 'src/app/core/services/photo';

import { ActivatedRoute } from '@angular/router';

import { ValidationService } from 'src/app/core/services/validation.service';
import { GoodsService } from 'src/app/core/services/goods.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ImageQueueService } from 'src/app/core/services/image-queue.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductDataMockService } from 'src/app/core/services/product-data-mock.service';
import { Store } from '@ngrx/store';
import { createProductAction } from 'src/app/core/store/actions/product.action';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  images$: Observable<IProductImage[]>;
  form: FormGroup;
  photos: IProductImage[];

  fileName: string;
  fileSize: string;

  progressValue: number;
  productData!: IProduct;

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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    ) {
      this.images$ = this.ImageQueueService.images$;
      this.form = this.formGroupInit();
      this.photos = [] as IProductImage[];
      this.progressValue = 0;
      this.fileName = '';
      this.fileSize = '';

      this.images$.subscribe(value => {
        this.photos = value

        this.form.patchValue({
          images: this.photos,
        }); 
      });

      this.productData = route.snapshot.data['product'];
      this.form.patchValue(this.productData);

      this.loadingProgress$.subscribe(
        value => {
          this.progressValue = Number(value);
      }
    );
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
    const productData: IProduct = this.form.getRawValue();
    // this.goodsService.addProduct(productData);

    this.store.dispatch( createProductAction({product: productData}) );
    
    console.log(this.form.getRawValue());

    this.form.reset();
    this.ImageQueueService.resetImage();
  }

  genImageControl(): Array<FormControl> {
    return Array.from({length: 10}, () => this.fb.control(new Photo('')));
  }

  openPdfFile(): void {
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

  returnUpdatedList(data: IProductImage[]): void {
    this.photos = data;

    this.form.patchValue({
      images: this.photos
    }); 
}
}