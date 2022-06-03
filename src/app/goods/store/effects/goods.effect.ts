import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from, switchMap, map, catchError, of, withLatestFrom } from "rxjs";
import { IProduct } from "../../../core/types/product.interface";
import { GoodsService } from "../../services/goods.service";
import {
    createProductAction,
    createProductFailureAction, 
    createProductSuccessAction,
    filterGoodsAction,
    filterGoodsFailureAction,
    filterGoodsSuccessAction,
    goodsAction,
    goodsFailureAction,
    goodsSuccessAction,
    sortGoodsAction,
    sortGoodsFailureAction,
    sortGoodsSuccessAction,
} from "../actions/goods.action";
import { goodsSelector } from "../selectors/goods.select";

@Injectable()
export class GoodsEffect {

    constructor(
        private actions$: Actions,
        private store: Store,
        private goodsService: GoodsService
    ) {}

    goods$ = createEffect(() => this.actions$.pipe(
        ofType(goodsAction),
        switchMap(() => 
            this.goodsService.goods$.pipe(
                map((goods: IProduct[]) => {
                    return goodsSuccessAction({goods})
                }),
                catchError(() => {
                    return of(goodsFailureAction())
                })
            )
        )
    ));

    createProduct$ = createEffect(() => this.actions$.pipe(
        ofType(createProductAction),
        withLatestFrom( this.store.select(goodsSelector) ),
        switchMap(([{product}, goods]) => 
            this.goodsService.createProduct(product, goods).pipe(
                map((goods: IProduct[]) => {
                    return createProductSuccessAction({goods})
                }),
                catchError(() => {
                    return of(createProductFailureAction())
                })
            )
        ))
    );

    sortGoods$ = createEffect(() => this.actions$.pipe(
        ofType(sortGoodsAction),
        withLatestFrom( this.store.select(goodsSelector) ),
        switchMap(([{sort}, goods]) => 
            from(this.goodsService.sortGoods(sort, goods)).pipe(
                map((goods: IProduct[]) => {
                    return sortGoodsSuccessAction({goods})
                }),
                catchError(() => {
                    return of(sortGoodsFailureAction())
                })
            )
        )
    ));

    filterGoods$ = createEffect(() => this.actions$.pipe(
        ofType(filterGoodsAction),
        withLatestFrom( this.store.select(goodsSelector) ),
        switchMap(([{filter}, goods]) => 
            from(this.goodsService.filterGoods(filter, goods)).pipe(
                map((goods: IProduct[]) => {
                    return filterGoodsSuccessAction({goods})
                }),
                catchError(() => {
                    return of(filterGoodsFailureAction())
                })
            )
        )
    ));
}