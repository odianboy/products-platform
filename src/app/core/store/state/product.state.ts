import { IProduct } from "../../interfaces/product.interface"; 

export interface IProductState {
    products: IProduct[] | null;
}

export const initialProductState: IProductState = {
    products: null,
}