import { Injectable } from '@angular/core';
import { genImage } from '../const/image-data.const';
import { brands, names, document, image } from '../const/product-data.const';
import { Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductDataMockService {

  generateRandomProducts(): Product[] {
    return Array.from({length: 40}, () => this.randomProduct());
  }

  randomProduct(): Product {
    return {
      name: this.randomProperty(names),
      brand: this.randomProperty(brands),
      code: this.genNum(100000),
      price: this.genNum(10000),
      document: document,
      images: this.genMockImg(),
      isActive: this.genBoolean()
    }
  }

  randomProperty<T>(arr: T[]): T {
    return arr[ Math.floor(Math.random() * arr.length) ];
  }

  genNum(before: number): number {
    return Math.round(Math.random() * before);
  }

  genBoolean(): boolean {
    return (Math.floor(Math.random() * 2) === 0);
  }

  genMockImg() {
    let item = image[ Math.floor(Math.random() * image.length) ];

    const mockPhoto = {
      name: 'product.jpeg',
      url: item,
      size: null,
      type: null
    }

    const images: any = [].concat( genImage() as [] );
    images.splice(0, 1, mockPhoto);

    return images
  }

}
