import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from, switchMap, map, catchError, of, withLatestFrom } from "rxjs";
import { IProduct } from "../../interfaces/product.interface";
import { GoodsService } from "../../services/goods.service";
import {
    createProductAction,
    createProductFailureAction, 
    createProductSuccessAction,
    filterProductAction,
    filterProductFailureAction,
    filterProuctSuccessAction,
    productAction,
    productFailureAction,
    productSuccessAction,
    sortProductAction,
    sortProductFailureAction,
    sortProductSuccessAction,
} from "../actions/product.action";
import { productsSelector } from "../selectors/product.select";

@Injectable()
export class ProductEffect {
    product$ = createEffect(() => this.actions$.pipe(
        ofType(productAction),
        switchMap(() => 
            from(this.goodsService.getGoods()).pipe(
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
        withLatestFrom( this.store.select(productsSelector) ),
        switchMap(([action, products]) => 
            this.goodsService.addProduct(action.product, products).pipe(
                map((products: IProduct[]) => {
                    return createProductSuccessAction({products})
                }),
                catchError(() => {
                    return of(createProductFailureAction())
                })
            )
        ))
    );

    sortProduct$ = createEffect(() => this.actions$.pipe(
        ofType(sortProductAction),
        withLatestFrom( this.store.select(productsSelector) ),
        switchMap(([action, products]) => 
            from(this.goodsService.sortGoods(action.sort, products)).pipe(
                map((products: IProduct[]) => {
                    return sortProductSuccessAction({products})
                }),
                catchError(() => {
                    return of(sortProductFailureAction())
                })
            )
        )
    ));


    filterProduct$ = createEffect(() => this.actions$.pipe(
        ofType(filterProductAction),
        withLatestFrom( this.store.select(productsSelector) ),
        switchMap(([action, products]) => 
            from(this.goodsService.filterGoods(action.filter, products)).pipe(
                map((products: IProduct[]) => {
                    return filterProuctSuccessAction({products})
                }),
                catchError(() => {
                    return of(filterProductFailureAction())
                })
            )
        )
    ));


    // saveProduct$ = createEffect(() => this.actions$.pipe(
    //     ofType(createProductAction),
    //     switchMap(({product}) => 
    //         this.goodsService.addProduct(product).pipe(
    //             map((products: IProduct[]) => {
    //                 return createProductSuccessAction({products})
    //             }),
    //             catchError(() => {
    //                 return of(createProductFailureAction())
    //             })
    //         )
    //     ))
    // );

    constructor(private actions$: Actions, private store: Store, private goodsService: GoodsService) {}
}