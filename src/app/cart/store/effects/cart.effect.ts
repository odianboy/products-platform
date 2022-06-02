import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, of, switchMap, map, withLatestFrom } from "rxjs";
import { IProduct } from "src/app/core/interfaces/product.interface";
import { CartService } from "../../services/cart.service";
import {
    cartAction,
    cartSuccessAction,
    cartFailureAction,
    createCartAction,
    createCartSuccessAction,
    createCartFailureAction,
    removeCartAction,
    removeCartSuccessAction,
    removeCartFailureAction,
} from "../actions/cart.action";
import { cartSelector } from "../selectors/cart.selector";

@Injectable()
export class CartEffect {
    constructor(
        private actions$: Actions,
        private cartService: CartService,
        private store: Store
    ) {}

    loadCart$ = createEffect(() => this.actions$.pipe(
        ofType(cartAction),
        switchMap(() => 
        this.cartService.cart$.pipe(
            map((cart: IProduct[]) => {
                return cartSuccessAction({cart});
            }),
            catchError(() => {
                return of(cartFailureAction());
            })
        ))
    ))

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(createCartAction),
        withLatestFrom( this.store.select(cartSelector) ),
        switchMap(([{product}, cart]) => 
            this.cartService.addCart(product, cart).pipe(
                map((cart: IProduct[]) => {
                    return createCartSuccessAction({cart});
                }),
                catchError(() => {
                    return of(createCartFailureAction());
                })
            )
        ))
    );

    removeProduct$ = createEffect(() => this.actions$.pipe(
        ofType(removeCartAction),
        withLatestFrom( this.store.select(cartSelector) ),
        switchMap(([{product}, cart]) =>
            this.cartService.removeCart(product, cart).pipe(
                map((cart: IProduct[]) => {
                    return removeCartSuccessAction({cart});
                }),
                catchError(() => {
                    return of(removeCartFailureAction());
                })
            )
        )
    ));
}