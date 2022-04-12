import { Component, EventEmitter, HostBinding, Input, OnInit, Output, AfterContentChecked, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {

  @Input() image!: any;
  @Input() numImage!: number;

  @Output() onAdd = new EventEmitter<File>();

  result: any;

  constructor(private changeDetector: ChangeDetectorRef, private imageService: ImageService) {
  }

  getUrl(image: any) {
    // let imageUrl = URL.createObjectURL(image);
    // let result = `url('${ imageUrl }')`;

    // console.log(image);

    
    // return this.imageService.getCover()[0];
    

    // return result;

    // return "url('https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80')";
  }

  addImage(image: any): void {
    // this.result = `url('${ URL.createObjectURL(image) }')`;

    // this.imageService.addCover(this.result)

    this.onAdd.emit(image);
  }

  // ngOnInit(): void {
    
  // }

  // ngAfterViewInit(): void {
  //   console.log(this.result);
    
  //   this.changeDetector.detectChanges();
  // }

}
