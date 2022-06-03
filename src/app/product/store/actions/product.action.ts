import { createAction, props } from "@ngrx/store";
import { IProduct } from "src/app/core/types/product.interface";
import { ActionTypes } from "../actionTypes";

export const productAction = createAction(ActionTypes.PRODUCT);
export const productSuccessAction = createAction(
    ActionTypes.PRODUCT_SUCCESS,
    props<{product: IProduct}>()
);
export const productFailureAction = createAction(ActionTypes.PRODUCT_FAILURE);

export const fillProductAction = createAction(
    ActionTypes.FILL_PRODUCT,
    props<{product: IProduct}>()
);
export const fillProductSuccessAction = createAction(
    ActionTypes.FILL_PRODUCT_SUCCESS,
    props<{product: IProduct}>()
);
export const fillProductFailureAction = createAction(ActionTypes.FILL_PRODUCT_FAILURE);
