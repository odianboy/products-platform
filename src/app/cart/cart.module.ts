import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "../core/core.module";
import { NavigationModule } from "../navigation/navigation.module";
import { CartComponent } from "./components/cart.component";
import { CartEffect } from "./store/effects/cart.effect";
import { reducers } from "./store/reducers/cart.reducer";

@NgModule({
    declarations: [
        CartComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        CoreModule,
        MatTableModule,
        MatSortModule,
        NavigationModule,
        StoreModule.forFeature('cart', reducers),
        EffectsModule.forFeature([CartEffect]),
    ],
})
export class CartModule {}
