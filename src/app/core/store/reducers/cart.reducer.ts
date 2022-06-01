import { Action, createReducer, on } from "@ngrx/store";
import { ICartState } from "../../interfaces/cart-state.interface";
import { cartAction, cartSuccessAction } from "../actions/cart.action";

const initialState: ICartState = {
    cart: []
}

const cartReducer = createReducer(
    initialState,
    on(cartAction, (state): ICartState => ({
        ...state
    })),
    on(cartSuccessAction, (state: ICartState, action) => ({
        ...state,
        cart: action.products
    }))
)

export function reducers(state: ICartState, action: Action) {
    return cartReducer(state, action);
}