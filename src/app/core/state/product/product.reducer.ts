// import { EProductActions, ProductActions } from "./product.actions";
// import { initialProductState, IProductState } from "./product.state";

// export const productReducers = (
//     state = initialProductState,
//     action: ProductActions
// ): IProductState => {
//     switch(action.type) {
//         case EProductActions.GetProductsSuccsess: {
//             return {
//                 ...state,
//                 products: action.payload
//             };
//         }
//         case EProductActions.GetProductSuccsess: {
//             return {
//                 ...state,
//                 selectedProduct: action.payload
//             };
//         }

//         default:
//             return state;
//     }
// };

import { createReducer, on } from '@ngrx/store';
import {
    addProduct,
    removeProduct,
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure,    
} from './product.actions';
import { IProduct } from '../../interfaces/product.interface';

export interface ProductState {
    products: IProduct[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ProductState = {
    products: [],
    error: null,
    status: 'pending',
}

export const productReducer = createReducer(
    initialState,
    on(addProduct, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
    })),
    on(removeProduct, (state, {product}) => ({
        ...state,
        products: state.products.filter((item) => item !== product),
    })),
    on(loadProducts, (state) => ({ ...state, status: 'loading' })),
    on(loadProductsSuccess, (state, { products }) => ({
        ...state,
        products: products,
        error: null,
        status: 'success',
    })),
    on(loadProductsFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    }))
);