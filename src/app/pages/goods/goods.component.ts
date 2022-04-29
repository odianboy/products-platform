import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { GoodsService } from 'src/app/core/services/goods.service';

import { MatTableDataSource } from '@angular/material/table';
import { BasketService } from 'src/app/core/services/basket.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  goods$!: Observable<Product[]>;
  dataSource!: MatTableDataSource<Product>;
  sortByPrcie: boolean = false;
  data!: Product[];

  constructor(
    private goodsService: GoodsService,
    private changeDetectorRef: ChangeDetectorRef,
    private basketService: BasketService) {

      this.goodsService.goods$.pipe(
        tap(
          value => {
            this.sortByPrcie ? value.sort( (a, b) => (a.price) - (b.price)) : value
          }
        )
      ).subscribe(items => {
        this.dataSource = new MatTableDataSource<Product>(items);
        this.data = items
      });
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.goods$ = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  addItemBasket(product: Product): void {
    this.basketService.addBasket(product);
  }

  sortPrice(): void {
  }
}
