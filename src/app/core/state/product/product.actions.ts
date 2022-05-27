// import { Action } from '@ngrx/store';

// import { IProduct } from '../../interfaces/product.interface';

// export enum EProductActions {
//     GetProducts = '[Product] Get Product',
//     GetProductsSuccsess = '[Product] GetUsers Success',
//     GetProduct = '[Product] Get Product',
//     GetProductSuccsess = '[Product] GetProduct Succsess',
// }

// export class GetProducts implements Action {
//     public readonly type = EProductActions.GetProducts;
// }

// export class GetProductsSuccsess implements Action {
//     public readonly type = EProductActions.GetProductsSuccsess;

//     constructor(public payload: IProduct[]) {};
// }

// export class GetProduct implements Action {
//     public readonly type = EProductActions.GetProduct;

//     constructor(public payload: number) {};
// }

// export class GetProductSuccsess implements Action {
//     public readonly type = EProductActions.GetProductSuccsess;

//     constructor(public payload: IProduct) {};
// }

// export type ProductActions = 
//     | GetProducts 
//     | GetProductsSuccsess 
//     | GetProduct 
//     | GetProductSuccsess;


import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.interface';

export const addProduct = createAction(
    '[Product Page] Add Product',
    props<{ product: IProduct }>()
);

export const removeProduct = createAction(
    '[Product Page] Remove Product',
    props<{ product: IProduct }>()
);

export const loadProducts = createAction('[Product Page] Load Products');

export const loadProductsSuccess =  createAction(
    '[Product API] Product Load Success',
    props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
    '[Product API] Product Load Failure',
    props<{ error: string }>()
);