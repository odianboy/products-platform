import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, map, Observable, take } from 'rxjs';
import { ValidDialogComponent } from 'src/app/pages/valid-dialog/valid-dialog.component';
import { ISize } from '../interfaces/image.interface';

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

  async checkResolution(file: File): Promise<boolean> {
    const maxResolution = 1000;

    let resolution = await this.getImgSize(URL.createObjectURL(file)).toPromise() as ISize;
    
    if (resolution.width > maxResolution || resolution.height > maxResolution) {
      const message =
      `
        Фото превышает максимальное разрешение ${maxResolution}x${maxResolution}.
        Текущие размеры: ${resolution.width}x${resolution.height}.
      `;
      this.openDialog(message);
    }

    return resolution.width > maxResolution || resolution.height > maxResolution;
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

  getImgSize(imageSrc: string): Observable<ISize> {

    let mapLoadedImage = (event: any): ISize => ({
      width: event.target.width,
      height: event.target.height
    })
  
    let image = new Image();
    image.src = imageSrc;

    let $loadedImg = fromEvent(image, 'load').pipe(take(1), map(mapLoadedImage));

    return $loadedImg;
  }

}
