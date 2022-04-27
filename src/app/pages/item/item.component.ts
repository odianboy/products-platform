import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() name: string;
  @Input() brand: string;
  @Input() price: number;

  constructor() {
    this.name = '';
    this.brand = '';
    this.price = 0;
  }

  ngOnInit(): void {
  }

}
