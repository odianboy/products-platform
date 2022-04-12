import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Image } from '../interfaces/image.interface';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<Image>();

  imageProduct!: Image;

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

    let images = event.dataTransfer!.files;

    if (images.length > 0) {
      let image = images[0];

      this.imageProduct = {
        name: image.name,
        url: `url('${ URL.createObjectURL(image) }')`,
        size: image.size,
        type: image.type
      }

      this.onFileDropped.emit(this.imageProduct);
    }
  }

  constructor() { }
}
