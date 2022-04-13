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

    if (images.length >= 10) {
        images.pop();
    }

    images.unshift(image);
    this._images$.next(images);
}

creationImage(file: File): Image {
    let image: Image = {
        name: file.name,
        url: `url('${ URL.createObjectURL(file) }')`,
        size: file.size,
        type: file.type
    }
    return image
}

changeOfPosition(event: CdkDragDrop<Image[]>) {
    const images = this._images$.getValue();

    console.log(images);
    console.log('было', event.previousIndex,'стало', event.currentIndex);
    

    moveItemInArray(images, event.previousIndex, event.currentIndex);
    console.log(images);

    // transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );

    // console.log(images);
    
    // console.log(event);

    // let element = images[event.previousIndex];

    // // console.log(event);

    // images.splice(event.previousIndex, 1);
    // images.splice(event.currentIndex, 0, element);

    // this._images$.next(images);
  };
}
