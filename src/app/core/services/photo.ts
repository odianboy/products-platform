import { ProductImage } from '../interfaces/image.interface';

export class Photo {
    image: ProductImage | string
    
    constructor(image: ProductImage | string) {
        this.image = image;
    }
}