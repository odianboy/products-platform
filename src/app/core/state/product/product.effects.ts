// import { Injectable } from '@angular/core';
// import { Effect, ofType, Actions } from '@ngrx/effects';
// import { Store, select } from '@ngrx/store';
// import { switchMap, map, of, withLatestFrom } from 'rxjs';

// import { IAppState } from '../app.state';
// import {
//     GetProductsSuccsess,
//     GetProductSuccsess,
//     GetProduct,
//     GetProducts,
//     EProductActions
// } from './product.actions'

// import { BasketService } from '../../services/basket.service';
// import { GoodsService } from '../../services/goods.service';
// import { selectProductList } from './product.selectors';
// import { IProductHttp } from '../../interfaces/product-http.interface';
// import { IProduct } from '../../interfaces/product.interface';

// @Injectable()
// export class ProductEffets {

//     constructor(
//         private _basketService: BasketService,
//         private _goodsService: GoodsService,
//         private _actions$: Actions,
//         private _store: Store<IAppState>
//     ) {}

//     @Effect()
//     getProduct$ = this._actions$.pipe(
//         ofType<GetProducts>(EProductActions.GetProducts),
//         switchMap( () => this._goodsService.goods$ ),
//         switchMap((products: IProduct[]) => {
//             return of(new GetProductsSuccsess(products))
//         })
//     )
// }

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    addProduct,
    removeProduct,
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure
} from './product.actions';
import { GoodsService } from '../../services/goods.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { selectAllProducts } from './product.selectors';
import { AppState } from '../app.state';

@Injectable()
export class ProductEffect {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private goodsService: GoodsService,
    ) {}

    loadProducts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadProducts),
            switchMap(()=>
                from(this.goodsService.goods$).pipe(
                    map((products) => loadProductsSuccess({ products: products })),
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );

    //TODO: Добавить метод сохранения

    saveProducts$ = createEffect(
        () => 
            this.actions$.pipe(
                ofType(addProduct, removeProduct),
                withLatestFrom(this.store.select(selectAllProducts)),
                switchMap(([action, todos]) => from(this.goodsService.goods$))
            ),
            { dispatch: false }

    )
};


