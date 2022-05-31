import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IAppState } from "../../interfaces/app-state.interface";
import { IProductState } from "../../interfaces/product-state.interface";

export const productFeatureSelector = createFeatureSelector<
    IAppState,
    IProductState
>('goods');

export const productsSelector = createSelector(
    productFeatureSelector,
    (productState: IProductState) => productState.products
);
