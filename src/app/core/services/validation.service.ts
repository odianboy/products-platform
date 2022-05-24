import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, map, Observable, take } from 'rxjs';
import { ValidDialogComponent } from 'src/app/pages/valid-dialog/valid-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(public dialog: MatDialog) {}

  checkSize(file: File): boolean {
    const maxSizeFile = 1;
    const size = 1024;
    const fileSize = Math.ceil(file.size / size / size );

    if (fileSize > maxSizeFile) {
      const message = `Файл не может превышать ${maxSizeFile} МБ.`;
      this.openDialog(message);
    }
    return fileSize > maxSizeFile;
  }

  checkResolution(image: HTMLImageElement): boolean {
    const maxResolution = 1000;

    if (image.width > maxResolution || image.height > maxResolution) {
      const message =
      `
        Фото превышает максимальное разрешение ${maxResolution}x${maxResolution}.
        Текущие размеры: ${image.width}x${image.height}.
      `;
      this.openDialog(message);
    }

    return image.width > maxResolution || image.height > maxResolution;
  }

  checkType(file: File): boolean {
    const fileType = 'image/jpeg';
    const message = `Можно загружать изображения только формата - ${fileType}.`;
    
    if (file.type !== fileType) {
      this.openDialog(message);
    }
    return file.type !== fileType;
  }

  openDialog(msg: string): void {
   this.dialog.open(ValidDialogComponent, {
      data: {
        text: msg
      }
    })
  }

  syncValidate(file: File): Observable<boolean> {
    const image = this.loadImage(file);

    return fromEvent(image, 'load').pipe(
      map( () => this.validate(file, image) ),
      take(1)
    )
  }

  loadImage(file: File): HTMLImageElement {
    const imageSrc = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageSrc;

    return image;
  }

  validate(file: File, image: HTMLImageElement): boolean {
    return this.checkSize(file) || this.checkType(file) || this.checkResolution(image);
  }

}
