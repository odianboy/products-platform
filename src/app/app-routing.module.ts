import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './pages/basket/basket.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'goods', component: GoodsComponent },
  { path: 'basket', component: BasketComponent },
  { path: '**', component: NavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
