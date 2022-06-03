import { Action, createReducer, on } from "@ngrx/store";
import { IProductState } from "../../types /product-state.interface";
import { fillProductSuccessAction, productSuccessAction } from "../actions/product.action";

const initialState: IProductState = {
    product: null,
}

const productReducer = createReducer(
    initialState,
    on(productSuccessAction, (state: IProductState, {product}) => ({
        ...state,
        product: product
    })),
    on(fillProductSuccessAction, (state: IProductState, {product}) => ({
        ...state,
        product: product
    }))
)

export function reducers(state: IProductState, action: Action) {
    return productReducer(state, action);
}