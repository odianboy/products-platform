import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../../core/types/product.interface";
import { ActioinTypes } from '../actionTypes';

export const cartAction = createAction(ActioinTypes.CART);
export const cartSuccessAction = createAction(
    ActioinTypes.CART_SUCCESS,
    props<{cart: IProduct[]}>()
);
export const cartFailureAction = createAction(ActioinTypes.CART_FAILURE);

export const createCartAction = createAction(
    ActioinTypes.CREATE_CART,
    props<{product: IProduct}>()
);
export const createCartSuccessAction = createAction(
    ActioinTypes.CREATE_CART_SUCCESS,
    props<{cart: IProduct[]}>()
);
export const createCartFailureAction = createAction(ActioinTypes.CREATE_CART_FAILURE);

export const removeCartAction = createAction(
    ActioinTypes.REMOVE_CART,
    props<{product: IProduct}>()
);
export const removeCartSuccessAction = createAction(
    ActioinTypes.REMOVE_CART_SUCCESS,
    props<{cart: IProduct[]}>()
);
export const removeCartFailureAction = createAction(ActioinTypes.REMOVE_CART_FAILURE);
