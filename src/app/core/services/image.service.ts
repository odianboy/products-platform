import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { images } from '../const/image-data.const';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    images$: Observable<any[]>;
    private _images$: BehaviorSubject<any[]>;

    cover$: Observable<any[]>;
    private _cover$: BehaviorSubject<any[]>;


constructor() {
    this._images$ = new BehaviorSubject(images);
    this.images$ = this._images$.asObservable();

    this._cover$ = new BehaviorSubject(images);
    this.cover$ = this._images$.asObservable();
}

addImage(image: any): void {
    const images = this._images$.getValue();

    if (images.length >= 10) {
        images.pop();
    }
    images.unshift(image);

    console.log(images);
    
    this._images$.next(images);
}

addCover(cover: any):void {
    const covers = [];

    console.log(cover);
    
    covers.unshift(cover)

    this._cover$.next(covers)
}

getCover() {
    return this._cover$.getValue();
}

}
