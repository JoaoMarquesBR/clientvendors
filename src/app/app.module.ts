import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatComponentsModuleModule } from './shared/mat-components-module/mat-components-module.module';
import { VendorsHomeComponent } from './components/vendors/vendors-home/vendors-home.component';
import { VendorsModule } from './components/vendors/vendors.module';
import { ProductHomeComponent } from './components/product/product-home/product-home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VendorsHomeComponent,
    ProductHomeComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatComponentsModuleModule,
    MatExpansionModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VendorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
