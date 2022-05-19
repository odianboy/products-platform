import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { genImage } from '../const/image-data.const';
import { ProductImage } from '../interfaces/image.interface';
import { Photo } from './photo';

@Injectable({
    providedIn: 'root'
})
export class ImageQueueService {

    images$: Observable<ProductImage[]>;
    private _images$: BehaviorSubject<any[]>;

    constructor() {
        this._images$ = new BehaviorSubject(genImage());
        this.images$ = this._images$.asObservable();
    }

    addImage(image: ProductImage): void {
        const images = this._images$.getValue();
        let previousIndex = 0;

        if (images.length >= 10) {
            images.pop();
        }

        images.forEach( (image, index) => image.url ? previousIndex = index + 1 : index)

        images.splice(previousIndex, 0, image);
        this._images$.next(images);
    }

    delImage(image: ProductImage): void {
        const images = this._images$.getValue();
        let indexProduct = images.indexOf(image);

        images.splice(indexProduct, 1);
        images.push(new Photo(''));

        this._images$.next(images);
    }

    resetImage(): void {
        this._images$.next(genImage());
    }

    creationImage(file: File): ProductImage {

        const blob2Base64 = (blob: Blob): Promise<string> => {
            
            return new Promise<string> ( (resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => resolve( reader.result!.toString() );
                reader.onerror = error => reject(error);
            });
        }

        let image: ProductImage = {
            name: file.name,
            url: '',
            size: file.size,
            type: file.type
        }

        blob2Base64(file).then(
            imageUrl => image.url = imageUrl
        );
        
        return image;
    }
}
