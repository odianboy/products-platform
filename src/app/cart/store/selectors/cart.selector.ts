import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/core/types/app-state.interface";
import { ICartState } from "../../types/cart-state.interface";

export const cartFeatureSelector = createFeatureSelector<
    IAppState,
    ICartState
>('cart');

export const cartSelector = createSelector(
    cartFeatureSelector,
    (cartState: ICartState) => cartState.cart,
);