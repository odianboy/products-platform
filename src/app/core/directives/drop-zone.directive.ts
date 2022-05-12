import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ProductImage } from '../interfaces/image.interface';
import { ImageService } from '../services/image.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() onFileDropped = new EventEmitter<ProductImage>();

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

    const files = event.dataTransfer!.files;

    Array.from(files).forEach( async file => {

      const fileSize = Math.ceil(file.size / 1024 / 1024 );

      if (file.type !== 'image/jpeg') {
        alert('Можно загружать изображения только формата - jpeg');
        return;
      }

      if(fileSize > 1) {
        alert(`Файл не может превыщать 1 МБ. Текущий размер файла ${fileSize} МБ.`);
        return;
      }

      const imageValidator = (blob: Blob): Promise<any> => {

        return new Promise<any> ( (resolve) => {
          const photo = new Image();
          photo.src = URL.createObjectURL(blob)
          photo.onload = () => resolve( {'width': photo.width, 'height': photo.height} )
        })
      }

      let resolution = await imageValidator(file);

      if (resolution.width > 1000 || resolution.height > 1000) {
        alert(`Фото превышает максимальное разрешение 1000x1000. Текущие размеры: ${resolution.width}x${resolution.height}`);
        return;
      }

      const photo = new Image();
      photo.src = URL.createObjectURL(file)

      fromEvent(photo, 'load').subscribe(val => console.log(val));

      let image = this.imageService.creationImage(file);
      this.onFileDropped.emit(image);
  });
  }
}
