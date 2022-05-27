// import { createSelector } from '@ngrx/store';

// import { IAppState } from '../app.state';
// import { IProductState } from './product.state';

// const selectProducts = (state: IAppState) => state.products;


// export const selectProductList= createSelector(
//     selectProducts,
//     (state: IProductState) => state.products
// );

// export const selectSelectedProduct = createSelector(
//     selectProducts,
//     (state: IProductState) => state.selectedProduct
// );

import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductState } from './product.reducer';

export const selectProducts = (state: AppState) => state.products;
export const selectAllProducts = createSelector(
    selectProducts,
    (state: ProductState) => state.products
);
