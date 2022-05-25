import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PortalModule } from '@angular/cdk/portal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProductImageComponent } from './pages/product-image/product-image.component';


import { CoreModule } from './core/core.module'
import { HttpClientModule } from '@angular/common/http';
import { GoodsComponent } from './pages/goods/goods.component';
import { ItemComponent } from './pages/item/item.component';
import { BasketComponent } from './pages/basket/basket.component';
import { MatSortModule } from '@angular/material/sort';
import { NumberedPaginationModule } from './shared/modules/numbered-pagination/numbered-pagination.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ValidDialogComponent } from './pages/valid-dialog/valid-dialog.component';

import { KtdGridModule } from '@katoid/angular-grid-layout';
import { SortablejsModule } from 'ngx-sortablejs';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [	
    AppComponent,
    NavigationComponent,
    ProductPageComponent,
    ProductImageComponent,
    GoodsComponent,
    ItemComponent,
    BasketComponent,
    ValidDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    PortalModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxDropzoneModule,
    DragDropModule,
    NgxMaskModule.forRoot(maskConfig),
    CoreModule,
    MatProgressBarModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    NumberedPaginationModule,
    NgxPaginationModule,
    MatDialogModule,
    KtdGridModule,
    SortablejsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
