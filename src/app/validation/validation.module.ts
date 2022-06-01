import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';

import { ValidDialogComponent } from "./components/valid-dialog.component";

@NgModule({
    declarations: [ValidDialogComponent],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    exports: [ValidDialogComponent],
})
export class ValidationModule {}