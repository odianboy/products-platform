import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DragDropSwapDirective } from './directives/drag-drop-swap.directive';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from './store/reducers/app.reducer';
import { ProductEffets } from './store/effects/product.effect';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    DropZoneDirective,
    DragDropSwapDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductEffets]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ?  StoreDevtoolsModule.instrument() : [],
  ],
  exports: [
    DropZoneDirective,
    DragDropSwapDirective
  ]
})
export class CoreModule { }
