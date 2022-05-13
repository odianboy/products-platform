import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { fromEvent, map, Observable, take } from 'rxjs';
import { ISize, ProductImage } from '../interfaces/image.interface';
import { ImageService } from '../services/image.service';
import { ValidationService } from '../services/validation.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<ProductImage>();

  constructor(
    private imageService: ImageService,
    private validService: ValidationService
  ) { }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) public ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer!.files;

    Array.from(files).forEach( async file => {

      if (this.validService.checkType(file)) {
        return;
      }

      if (this.validService.checkSize(file)) {
        return;
      }

      if (await this.validService.checkResolution(file)) {
        return;
      }

    //  function getImgSize(imageSrc: string): Observable<ISize> {

    //     let mapLoadedImage = (event: any): ISize => ({
    //       width: event.target.width,
    //       height: event.target.height
    //     })
      
    //     let image = new Image();
    //     image.src = imageSrc;
    
    //     let $loadedImg = fromEvent(image, "load").pipe(take(1), map(mapLoadedImage));
        
    //     return $loadedImg;
    //   }

    //   getImgSize(URL.createObjectURL(file)).subscribe(value => console.log(value))

      let image = this.imageService.creationImage(file);
      this.onFileDropped.emit(image);
  });
  }
}
