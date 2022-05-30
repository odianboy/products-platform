import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, of, map, withLatestFrom, from, tap, concatMap } from 'rxjs';

import { cloneDeep } from 'lodash'


import {
    GetProductsSuccsess,
    GetProducts,
    EProductActions,
    AddProductSuccess,
    AddProduct,
} from '../actions/product.actions'

import { selectProductList } from '../selectors/product.selector';

import { GoodsService } from '../../services/goods.service';
import { IProduct } from '../../interfaces/product.interface';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';

@Injectable()
export class ProductEffets {

    constructor(
        private _goodsService: GoodsService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) {}

    getProduct$ = createEffect( () => this._actions$.pipe(
        ofType<GetProducts>(EProductActions.GetProducts),
        switchMap( () => this._goodsService.goods$ ),
        switchMap((products: IProduct[]) => {
            return of(new GetProductsSuccsess(products))
        })
    ));

    // addProduct$ = createEffect( () => this._actions$.pipe(
    //     ofType<AddProduct>(EProductActions.AddProduct),
    //     map((action: AddProduct) => action.payload),
    //     withLatestFrom(this._store.pipe(select(selectProductList))),
    //     switchMap( ([action, product]) => this._goodsService.addProduct(action)),
    //     map((response) => 
    //         new AddProductSuccess(response)
    //     ),
    // ))
}