import { Action, createReducer, on } from "@ngrx/store";
import { IGoodsState } from "../../types/goods-state.interface";
import {
    createProductSuccessAction,
    filterGoodsSuccessAction,
    goodsSuccessAction,
    sortGoodsSuccessAction
} from "../actions/goods.action";

const initialState: IGoodsState = {
    goods: []
}

const goodsReducer = createReducer(
    initialState,
    on(goodsSuccessAction, (state: IGoodsState, {goods}) => ({
        ...state,
        goods: goods,
    })),
    on(createProductSuccessAction, (state: IGoodsState, {goods}) => ({
        ...state,
        goods: goods,
    })),
    on(sortGoodsSuccessAction, (state: IGoodsState, {goods}) => ({
        ...state,
        goods: goods,
    })),
    on(filterGoodsSuccessAction, (state: IGoodsState, {goods}) => ({
        ...state,
        goods: goods,
    })),
);

export function reducers(state: IGoodsState, action: Action) {
    return goodsReducer(state, action);
}