import { IProductImage } from '../../core/types/image.interface';

export class Photo {
    image: IProductImage | string | null
    
    constructor(image: IProductImage | string) {
        this.image = image;
    }
}