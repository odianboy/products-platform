import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../interfaces/product.interface";

import { ActioinTypes } from "../actionTypes";

export const productAction = createAction(ActioinTypes.PRODUCT);

export const productSuccessAction = createAction(
    ActioinTypes.PRODUCT_SUCCESS,
    props<{products: IProduct[]}>()
);

export const productFailureAction = createAction(ActioinTypes.PRODUCT_FAILURE);

export const createProductAction = createAction(
    ActioinTypes.CREATE_PRODUCT,
    props<{product: IProduct}>()
);

export const createProductSuccessAction = createAction(
    ActioinTypes.CREATE_PRODUCT_SUCCESS,
    props<{products: IProduct[]}>()
)

export const createProductFailureAction = createAction(ActioinTypes.CREATE_PRODUCT_FAILURE);