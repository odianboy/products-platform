import { Injectable } from '@angular/core';
import { brands, names, document, images } from '../const/product-data.const';
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
      image: images,
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
}
