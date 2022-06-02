import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../../core/interfaces/product.interface";

import { ActioinTypes } from "../actionTypes";

export const goodsAction = createAction(ActioinTypes.GOODS);
export const goodsSuccessAction = createAction(
    ActioinTypes.GOODS_SUCCESS,
    props<{goods: IProduct[]}>()
);
export const goodsFailureAction = createAction(ActioinTypes.GOODS_FAILURE);

export const createProductAction = createAction(
    ActioinTypes.CREATE_PRODUCT,
    props<{product: IProduct}>()
);
export const createProductSuccessAction = createAction(
    ActioinTypes.CREATE_PRODUCT_SUCCESS,
    props<{goods: IProduct[]}>()
);
export const createProductFailureAction = createAction(ActioinTypes.CREATE_PRODUCT_FAILURE);

export const sortGoodsAction = createAction(
    ActioinTypes.SORT_GOODS,
    props<{sort: Boolean}>()
);
export const sortGoodsSuccessAction = createAction(
    ActioinTypes.SORT_GOODS_SUCCESS,
    props<{goods: IProduct[]}>()
);
export const sortGoodsFailureAction = createAction(ActioinTypes.SORT_GOODS_FAILURE);

export const filterGoodsAction = createAction(
    ActioinTypes.FILTER_GOODS,
    props<{filter: Boolean}>()
);
export const filterGoodsSuccessAction = createAction(
    ActioinTypes.FILTER_GOODS_SUCCESS,
    props<{goods: IProduct[]}>()
);
export const filterGoodsFailureAction = createAction(ActioinTypes.FILTER_GOODS_FAILURE);