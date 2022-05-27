import { EProductActions, ProductActions } from "../actions/product.action";
import { initialProductState, IProductState } from "../state/product.state";

export const productReducers = (
    state = initialProductState,
    action: ProductActions
): IProductState => {
    switch(action.type) {
        case EProductActions.GetProductsSuccsess: {
            return {
                ...state,
                products: action.payload
            };
        }
        case EProductActions.GetProductSuccsess: {
            return {
                ...state,
                selectedProduct: action.payload
            };
        }

        default:
            return state;
    }
};