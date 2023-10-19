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
import { ProductModule } from './components/product/product.module';
import { GeneratorComponent } from './components/generator/generator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VendorsHomeComponent,
  ],
  imports: [
    BrowserModule,
    MatComponentsModuleModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VendorsModule,
    ProductModule,
    GeneratorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
