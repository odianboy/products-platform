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
    ],
    exports: [GoodsComponent]
})
export class GoodsModule {

}
