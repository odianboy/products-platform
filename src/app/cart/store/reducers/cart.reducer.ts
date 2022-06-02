import { Action, createReducer, on } from "@ngrx/store";
import { ICartState } from "../../types/cart-state.interface";
import {
    cartSuccessAction,
    createCartSuccessAction,
    removeCartSuccessAction
} from "../actions/cart.action";

const initialState: ICartState = {
    cart: [],
}

const cartReducer = createReducer(
    initialState,
    on(cartSuccessAction, (state: ICartState, {cart}) => ({
        ...state,
        cart: cart,
    })),
    on(createCartSuccessAction, (state: ICartState, {cart}) => ({
        ...state,
        cart: cart,
    })),
    on(removeCartSuccessAction, (state: ICartState, {cart}) => ({
        ...state,
        cart: cart,
    })),
)

export function reducers(state: ICartState, action: Action) {
    return cartReducer(state, action);
}