import { Directive, Output, EventEmitter, HostBindingDecorator, HostListener, HostBinding } from '@angular/core';
import { Image } from '../interfaces/image.interface';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  imageTest!: Image;

  // @HostBinding('style.background-image') public backgroundImage = 'none';
  // @HostBinding('style.border') public border = 'dotted rgb(0, 0, 0, 0.25)';
  @HostBinding('style.font-size') public fontSize = '';

  @HostBinding('style.background-color') public background = 'none';
  

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

    if (images.length > 0) {
      let image = images[0];

      this.imageTest = {
        name: image.name,
        url: `url('${ URL.createObjectURL(image) }')`,
        size: image.size,
        type: image.type
      }

      
      

      this.onFileDropped.emit(this.imageTest);

      // const test = URL.createObjectURL(image)

      // console.log(test);

      // this.backgroundImage = `url('${ test }')`;
      // this.border = 'transparent';
      // this.fontSize = '0';
      

      // reader.readAsDataURL(image);

      // reader.onload = () => {
      //   this.backgroundImage = `url('${ reader.result }')`;
        // this.border = 'transparent';
        // this.fontSize = '0';
      // }

    }
  }

  constructor() { }
}
