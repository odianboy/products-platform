import { NgModule } from "@angular/core";
import { NavigationComponent } from "./components/navigation.component";

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    imports: [
        MatListModule,
        MatIconModule,
        MatTooltipModule,
    ],
    declarations: [NavigationComponent],
    exports: [NavigationComponent]
})
export class NavigationModule {}