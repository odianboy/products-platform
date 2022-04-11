import { Directive, Output, EventEmitter, HostBindingDecorator, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-image') public backgroundImage = 'none';
  @HostBinding('style.border') public border = 'dotted rgb(0, 0, 0, 0.25)';
  @HostBinding('style.font-size') public fontSize = '';

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

    const reader = new FileReader();

    let images = event.dataTransfer!.files;

    // console.log(images);
    

    if (images.length > 0) {
      let image = images[0];

      this.onFileDropped.emit(image);

      reader.readAsDataURL(image);

      reader.onload = () => {
        this.backgroundImage = `url('${ reader.result }')`;
        this.border = 'transparent';
        this.fontSize = '0';
      }
    }
  }

  constructor() { }
}
