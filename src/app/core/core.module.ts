import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DragDropSwapDirective } from './directives/drag-drop-swap.directive';

@NgModule({
  declarations: [
    DropZoneDirective,
    DragDropSwapDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropZoneDirective,
    DragDropSwapDirective
  ]
})
export class CoreModule { }
