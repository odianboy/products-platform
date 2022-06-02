import { NgModule } from "@angular/core";
import { GoodsComponent } from "./components/goods.component";

import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from "@angular/material/card";
import { NavigationModule } from "../navigation/navigation.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { ProductModule } from "../product/prodcut.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";

import { StoreModule } from '@ngrx/store';
import { reducers } from '../goods/store/reducers/goods.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from '../goods/store/effects/goods.effect';

@NgModule({
    declarations: [GoodsComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatCardModule,
        NavigationModule,
        MatMenuModule,
        MatIconModule,
        ProductModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTooltipModule,
        StoreModule.forFeature('goods', reducers),
        EffectsModule.forFeature([ProductEffect]),
    ],
    exports: [GoodsComponent]
})
export class GoodsModule {}
