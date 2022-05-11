import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { images } from '../const/image-data.const';
import { Image } from '../interfaces/image.interface';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    images$: Observable<Image[]>;
    private _images$: BehaviorSubject<any[]>;

    constructor() {
        this._images$ = new BehaviorSubject(images);
        this.images$ = this._images$.asObservable();
    }

    addImage(image: Image): void {
        const images = this._images$.getValue();
        let previousIndex = 0;

        if (images.length >= 10) {
            images.pop();
        }

        for (let i = 0; i < images.length; i++) {
            if (typeof images[i] === 'object') {
                previousIndex = i + 1;
            }
        }

        images.splice(previousIndex, 0, image);
        this._images$.next(images);
    }

    delImage(image: Image): void {
        const images = this._images$.getValue();
        let indexProduct = images.indexOf(image);
        images.splice(indexProduct, 1);
        images.push('');

        this._images$.next(images);
    }

    resetImage(): void {
        this._images$.next(['', '', '', '', '', '', '', '', '', '']);
    }

    creationImage(file: File): Image {

        const blob2Base64 = (blob: Blob): Promise<string> => {
            
            return new Promise<string> ( (resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => resolve( reader.result!.toString() );
                reader.onerror = error => reject(error);
            });
        }

        let image: Image = {
            name: file.name,
            url: `url('${ URL.createObjectURL(file) }')`,
            urlCover: '',
            size: file.size,
            type: file.type
        }

        blob2Base64(file).then(
            imageCover => image.urlCover = imageCover
        );
        
        return image;
    }
}
