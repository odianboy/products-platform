import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Image } from '../interfaces/image.interface';
import { ImageService } from '../services/image.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<Image>();

  constructor(private imageService: ImageService) { }

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

    let file = event.dataTransfer!.files[0];
    let image = this.imageService.creationImage(file);

    this.onFileDropped.emit(image);
  }
}
