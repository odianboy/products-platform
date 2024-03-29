import {
    Directive,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
  } from '@angular/core';
import { IProductImage } from '../types/image.interface';
  
  @Directive({
    selector: '[appDragDropSwap]',
  })
  export class DragDropSwapDirective {

    @HostBinding('attr.draggable') draggable = true;
    
    @Input() elemPosition: number;
    @Input() list: IProductImage[];
    @Output() updatedList: EventEmitter<IProductImage[]>;

    constructor() {
        this.list = [] as IProductImage[];
        this.elemPosition = 0;
        this.updatedList = new EventEmitter<IProductImage[]>();
    }

    @HostListener('dragstart', ['$event'])
    onDragStart(event: any) {
      event.dataTransfer.setData('index', this.elemPosition);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: any) {
      event.preventDefault();

      let sourceElementIndex = event.dataTransfer.getData('index');
      let destElementIndex = this.elemPosition;
      let clonedList = [...this.list];

      let currentElement = clonedList[sourceElementIndex];
      let destElement = clonedList[destElementIndex];

      if (currentElement?.name && destElement?.name) {
        if (sourceElementIndex !== destElementIndex) {

          clonedList.splice(destElementIndex, 1, this.list[sourceElementIndex]);
          clonedList.splice(sourceElementIndex, 1, this.list[destElementIndex]);
  
          this.updatedList.emit(clonedList);
        }
      }
    }
  
    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
      event.preventDefault();
    }
  }
  