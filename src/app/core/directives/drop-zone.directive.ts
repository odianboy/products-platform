import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { fromEvent, map, Observable, take } from 'rxjs';
import { ISize, ProductImage } from '../interfaces/image.interface';
import { ImageQueueService } from '../services/image-queue.service';
import { ValidationService } from '../services/validation.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<ProductImage>();

  constructor(
    private ImageQueueService: ImageQueueService,
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

      let image = this.ImageQueueService.creationImage(file);
      this.onFileDropped.emit(image);
    });
  }
}
