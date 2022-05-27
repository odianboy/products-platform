import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DragDropSwapDirective } from './directives/drag-drop-swap.directive';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { productReducer } from './state/product/product.reducer';
import { environment } from 'src/environments/environment';
import { ProductEffect } from './state/product/product.effects';

// import { appReducers } from './state/product/app.reducer';
// import { ProductEffets } from './state/product/product.effects';
// import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    DropZoneDirective,
    DragDropSwapDirective
  ],
  imports: [
    CommonModule,
    // StoreModule.forRoot(appReducers),
    // EffectsModule.forRoot([ProductEffets]),
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    // !environment.production ?  StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({products: productReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ProductEffect]),
  ],
  exports: [
    DropZoneDirective,
    DragDropSwapDirective
  ]
})
export class CoreModule { }
