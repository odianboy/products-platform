import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, Observable, Subscriber, take, tap } from 'rxjs';

import { genImage } from '../const/image-data.const';
import { IProductImage } from '../interfaces/image.interface';
import { Photo } from './photo';

@Injectable({
    providedIn: 'root'
})
export class ImageQueueService {

    images$: Observable<IProductImage[]>;
    private _images$: BehaviorSubject<any[]>;

    constructor() {
        this._images$ = new BehaviorSubject(genImage());
        this.images$ = this._images$.asObservable();
    }

    addImage(image: IProductImage): void {
        const images = this._images$.getValue();
        let previousIndex = 0;

        if (images.length >= 10) {
            images.pop();
        }

        images.forEach( (image, index) => image.url ? previousIndex = index + 1 : index)

        images.splice(previousIndex, 0, image);
        this._images$.next(images);
    }

    delImage(image: IProductImage): void {
        const images = this._images$.getValue();
        let indexProduct = images.indexOf(image);

        images.splice(indexProduct, 1);
        images.push(new Photo(''));

        this._images$.next(images);
    }

    resetImage(): void {
        this._images$.next( genImage() );
    }

    creationImage(file: File): IProductImage {

        let image: IProductImage = {
            name: file.name,
            size: file.size,
            type: file.type
        }

        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => image.url = reader.result;


        const file$ = new Observable((sub: Subscriber<any>) => {
            this.readFile(file, sub);
        });

        file$.subscribe(value => {
            image.url = value
        })

        return image;
    }

    readFile(file: File, sub: Subscriber<any>) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            sub.next(fileReader.result);
            sub.complete();
        }
    }
}
