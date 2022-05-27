import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, of, withLatestFrom } from 'rxjs';

import { IAppState } from '../state/app.state';
import {
    GetProductsSuccsess,
    GetProductSuccsess,
    GetProduct,
    GetProducts,
    EProductActions
} from '../actions/product.action'

import { BasketService } from '../../services/basket.service';
import { GoodsService } from '../../services/goods.service';
import { selectProductList } from '../selectors/product.selector';
import { IProductHttp } from '../../interfaces/product-http.interface';
import { IProduct } from '../../interfaces/product.interface';

@Injectable()
export class ProductEffets {

    constructor(
        private _basketService: BasketService,
        private _goodsService: GoodsService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) {}

    @Effect()
    getProduct$ = this._actions$.pipe(
        ofType<GetProducts>(EProductActions.GetProducts),
        switchMap( () => this._goodsService.goods$ ),
        switchMap((products: IProduct[]) => {
            return of(new GetProductsSuccsess(products))
        })
    )
}

