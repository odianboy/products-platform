import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { images } from '../const/image-data.const';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    images$: Observable<any[]>;
    private _images$: BehaviorSubject<any[]>;

constructor() {
    this._images$ = new BehaviorSubject(images);
    this.images$ = this._images$.asObservable();
}

addImage(image: File): void {
    const images = this._images$.getValue();

    // console.log(images);
    

    // images.splice(0, 1, image);
    // images.unshift(image);

    // this._images$.next(images);
}

}
