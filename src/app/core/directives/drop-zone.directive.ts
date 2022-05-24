import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProductImage } from '../interfaces/image.interface';
import { ImageQueueService } from '../services/image-queue.service';
import { ValidationService } from '../services/validation.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<IProductImage>();

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

      if (await lastValueFrom(this.validService.syncValidate(file))) {
        return
      }

      let image = this.ImageQueueService.creationImage(file);
      this.onFileDropped.emit(image);
    });
  }
}
