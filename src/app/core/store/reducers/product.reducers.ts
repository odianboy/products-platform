import { createReducer, on } from "@ngrx/store";
import { IProduct } from "../../interfaces/product.interface";
import { EProductActions, ProductActions } from "../actions/product.actions";
import { initialProductState, IProductState } from "../state/product.state";

import { cloneDeep } from 'lodash'

export const productReducers = (
    state = initialProductState,
    action: ProductActions
): IProductState => {
    switch(action.type) {
        case EProductActions.GetProductsSuccsess: {
            console.log(action.payload);
            
            return {
                ...state,
                products: action.payload
            };
        }
        case EProductActions.AddProduct: {
            const entriesClone: any = cloneDeep(state);
            entriesClone['products'].unshift(action.payload);

            // console.log(state);
            // console.log(entriesClone['products']);
            
            return {
                ...state,
                products: entriesClone['products']
            }
        }
        default:
            return state;
    }
};
