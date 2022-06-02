import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/core/interfaces/app-state.interface";
import { IProductState } from "../../types /product-state.interface";

export const productFeatureSelector = createFeatureSelector<
    IAppState,
    IProductState
>('product');

export const productSelector = createSelector(
    productFeatureSelector,
    (productState: IProductState) => productState.product
);
