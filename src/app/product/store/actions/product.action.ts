import { createAction, props } from "@ngrx/store";
import { IProduct } from "src/app/core/interfaces/product.interface";
import { ActionTypes } from "../actionTypes";

export const productAction = createAction(ActionTypes.PRODUCT);
export const productSuccessAction = createAction(
    ActionTypes.PRODUCT_SUCCESS,
    props<{product: IProduct}>()
);
export const productFailureAction = createAction(ActionTypes.PRODUCT_FAILURE);