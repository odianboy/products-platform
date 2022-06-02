import { NgModule } from "@angular/core";

import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from "@angular/material/card";
import { NavigationModule } from "../navigation/navigation.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { ProductComponent } from "./components/product/product.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ProductPageComponent } from "./components/product-page/product-page.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ValidationModule } from "../validation/validation.module";
import { CoreModule } from "../core/core.module";
import { ProductImageComponent } from "./components/product-image/product-image.component";

import { StoreModule } from '@ngrx/store';
import { reducers } from '../goods/store/reducers/goods.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from '../goods/store/effects/goods.effect';

@NgModule({
    declarations: [ProductComponent, ProductImageComponent, ProductPageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NavigationModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatCardModule,
        ValidationModule,
        CoreModule,
        StoreModule.forFeature('product', reducers),
        EffectsModule.forFeature([ProductEffect]),
    ],
    exports: [ProductComponent, ProductImageComponent, ProductPageComponent]
})
export class ProductModule {}
