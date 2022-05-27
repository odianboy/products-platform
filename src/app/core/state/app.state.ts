// import { RouterReducerState } from '@ngrx/router-store';

// import { IProductState, initialProductState } from './product/product.state';

// export interface IAppState {
//     router?: RouterReducerState;
//     products: IProductState;
// }


// export const initialAppState: IAppState = {
//     products: initialProductState,
// }

// export function getInitialState(): IAppState {
//     return initialAppState;
// }

import { ProductState } from './product/product.reducer';

export interface AppState {
    products: ProductState;
}