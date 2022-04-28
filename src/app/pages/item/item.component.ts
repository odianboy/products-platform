import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/core/interfaces/image.interface';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  productImage = 'https://images.unsplash.com/photo-1617360547704-3da8b5363369?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

  @Input() item!: Product;

  constructor() {}

  imageProduct(item: Product) {
    return this.item.image[0].urlCover;
  }

  ngOnInit(): void {
  }

}
