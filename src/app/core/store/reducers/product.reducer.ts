import { Action, createReducer, on } from "@ngrx/store";
import { IProductState } from "../../interfaces/product-state.interface";
import { createProductAction, productAction, productFailureAction, productSuccessAction } from "../actions/product.action";

const initialState: IProductState = {
    products: null
}

const productReducer = createReducer(
    initialState,
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
    // on(createProductAction, (state) => ({
    //     ...state,
    // }))
);

export function reducers(state: IProductState, action: Action) {
    return productReducer(state, action);
}