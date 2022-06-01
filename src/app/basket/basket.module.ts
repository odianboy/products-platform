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
import { CoreModule } from "../core/core.module";
import { NavigationModule } from "../navigation/navigation.module";
import { BasketComponent } from "./components/basket.component";

@NgModule({
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
    ],
    declarations: [
        BasketComponent,
    ],
})
export class BasketModule {}
