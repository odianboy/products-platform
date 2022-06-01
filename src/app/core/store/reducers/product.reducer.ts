import { Action, createReducer, on } from "@ngrx/store";
import { IProductState } from "../../interfaces/product-state.interface";
import {
    createProductAction,
    createProductSuccessAction,
    filterProuctSuccessAction,
    productAction,
    productFailureAction,
    productSuccessAction,
    sortProductSuccessAction
} from "../actions/product.action";

const initialState: IProductState = {
    products: []
}

const productReducer = createReducer(
    initialState,
    on(createProductSuccessAction, (state: IProductState, action) => ({
        ...state,
        products: action.products
    })),
    on(productAction, (state): IProductState => ({
        ...state,
    })),
    on(productSuccessAction, (state: IProductState, action) => ({
        ...state,
        products: action.products
    })),
    on(productFailureAction, (state): IProductState => ({
        ...state
    })),
    on(sortProductSuccessAction, (state: IProductState, action) => ({
        ...state,
        products: action.products
    })),
    on(filterProuctSuccessAction, (state: IProductState, action) => ({
        ...state,
        products: action.products
    })),
);

export function reducers(state: IProductState, action: Action) {
    return productReducer(state, action);
}