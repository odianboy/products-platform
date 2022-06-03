import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, switchMap, map, of, withLatestFrom } from "rxjs";
import { IProduct } from "src/app/core/types/product.interface";
import { ProductService } from "../../services/product.service";
import { fillProductAction, fillProductFailureAction, fillProductSuccessAction, productAction, productFailureAction, productSuccessAction } from "../actions/product.action";
import { productSelector } from "../selectors/product.selector";

@Injectable()
export class ProductEffect {
    constructor(
        private actions$: Actions,
        private store: Store,
        private productService: ProductService,
    ) {}

    loadProduct$ = createEffect(() => this.actions$.pipe(
        ofType(productAction),
        switchMap(() =>
            this.productService.product$.pipe(
                map((product: IProduct) => {
                    return productSuccessAction({product});
                }),
                catchError(() => {
                    return of(productFailureAction());
                })
            )
        )
    ));

    fillProdcut$ = createEffect(() => this.actions$.pipe(
        ofType(fillProductAction),
        withLatestFrom( this.store.select(productSelector) ),
        switchMap(([{product}]) =>
        this.productService.fillProduct(product).pipe(
            map((product: IProduct) => {
                return fillProductSuccessAction({product});
            }),
            catchError(() => {
                return of(fillProductFailureAction());
            })
        )
        )
    ))
}