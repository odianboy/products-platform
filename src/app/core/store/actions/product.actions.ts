import { Action, createAction, props } from '@ngrx/store';

import { IProduct } from '../../interfaces/product.interface';

export enum EProductActions {
    GetProducts = '[Product] Get Products',
    GetProductsSuccsess = '[Product] Get Products Success',
    AddProduct = '[Product] Add Product',
    AddProductSuccess = '[Product] Add Product Success',
}

export class GetProducts implements Action {
    public readonly type = EProductActions.GetProducts;
}

export class GetProductsSuccsess implements Action {
    public readonly type = EProductActions.GetProductsSuccsess;

    constructor(public payload: IProduct[]) {};
}

export class AddProduct implements Action {
    public readonly type = EProductActions.AddProduct;

    constructor(public payload: IProduct) {};
}

export class AddProductSuccess implements Action {
    public readonly type = EProductActions.AddProductSuccess;

    constructor(public payload: IProduct[]) {};
}

export type ProductActions = 
    | GetProducts 
    | GetProductsSuccsess
    | AddProduct
    | AddProductSuccess
