import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../interfaces/product.interface";
import { ActioinTypes } from "../actionTypes";

export const cartAction = createAction(ActioinTypes.CART);
export const cartSuccessAction = createAction(
    ActioinTypes.CART_SUCCESS,
    props<{products: IProduct[]}>()
)
export const cartFailureAction = createAction(ActioinTypes.CART_FAILURE);