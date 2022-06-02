import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product/services/product.resolver';
import { CartComponent } from './cart/components/cart.component';
import { GoodsComponent } from './goods/components/goods.component';
import { NavigationComponent } from './navigation/components/navigation.component';
import { ProductPageComponent } from './product/components/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'goods', component: GoodsComponent },
  { path: 'product/:code',
    component: ProductPageComponent,
    resolve: {
      product: ProductResolver
    }
  },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
