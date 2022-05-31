import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from, switchMap, map, catchError, of, withLatestFrom } from "rxjs";
import { IProduct } from "../../interfaces/product.interface";
import { GoodsService } from "../../services/goods.service";
import { createProductAction, createProductFailureAction, createProductSuccessAction, productAction, productFailureAction, productSuccessAction } from "../actions/product.action";
import { productsSelector } from "../selectors/product.select";

@Injectable()
export class ProductEffect {
    product$ = createEffect(() => this.actions$.pipe(
        ofType(productAction),
        switchMap(() => 
            from(this.goodsService.goods$).pipe(
                map((products: IProduct[]) => {
                    return productSuccessAction({products})
                }),
                catchError(() => {
                    return of(productFailureAction())
                })
            )
        )
    ));

    saveProduct$ = createEffect(() => this.actions$.pipe(
        ofType(createProductAction),
        switchMap(({product}) => 
            this.goodsService.addProduct(product).pipe(
                map((products: IProduct[]) => {
                    return createProductSuccessAction({products})
                }),
                catchError(() => {
                    return of(createProductFailureAction())
                })
            )
        ))
    )

    constructor(private actions$: Actions, private store: Store, private goodsService: GoodsService) {}
}