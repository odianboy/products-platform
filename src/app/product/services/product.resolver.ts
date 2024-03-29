import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../../core/types/product.interface';
import { GoodsService } from '../../goods/services/goods.service';


@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {
    
    constructor(
        private goodsService: GoodsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
        return this.goodsService.getProductByCode(+route.params['code']);
    }
}
