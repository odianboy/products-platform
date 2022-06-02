import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IAppState } from "../../../core/interfaces/app-state.interface";
import { IGoodsState } from "../../types/goods-state.interface";

export const goodsFeatureSelector = createFeatureSelector<
    IAppState,
    IGoodsState
>('goods');

export const goodsSelector = createSelector(
    goodsFeatureSelector,
    (goodsState: IGoodsState) => goodsState.goods
);
