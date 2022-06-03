import { ICartState } from "src/app/cart/types/cart-state.interface";
import { IProductState } from "src/app/product/types /product-state.interface";
import { IGoodsState } from "../../goods/types/goods-state.interface";

export interface IAppState {
    goods?: IGoodsState,
    cart?: ICartState,
    product?: IProductState,
}