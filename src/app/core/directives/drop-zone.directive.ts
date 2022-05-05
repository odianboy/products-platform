import { Directive, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { Image } from '../interfaces/image.interface';
import { ImageService } from '../services/image.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<Image>();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';
  @HostBinding('style.border') public border!: string;

  constructor(private imageService: ImageService) { }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.5'
    this.border = 'none'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fff'
    this.opacity = '1'
    this.border = 'dotted rgb(0, 0, 0, 0.25)'
  }

  @HostListener('drop', ['$event']) public ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'

    let file = event.dataTransfer!.files[0];
    let image = this.imageService.creationImage(file);

    this.onFileDropped.emit(image);
  }
}
