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
    VendorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
