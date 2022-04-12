import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

    if (images.length >= 10) {
        images.pop();
    }
    images.unshift(image);
    this._images$.next(images);
}
}
