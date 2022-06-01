import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropZoneDirective } from './directives/drop-zone.directive';
import { DragDropSwapDirective } from './directives/drag-drop-swap.directive';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './store/effects/product.effect';


@NgModule({
  declarations: [
    DropZoneDirective,
    DragDropSwapDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('goods', reducers),
    EffectsModule.forFeature([ProductEffect]),
  ],
  exports: [
    DropZoneDirective,
    DragDropSwapDirective
  ]
})
export class CoreModule { }
