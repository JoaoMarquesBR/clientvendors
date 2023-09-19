import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { MatComponentsModuleModule } from 'src/app/shared/mat-components-module/mat-components-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VendordetailComponent } from './vendordetail/vendordetail.component';


@NgModule({
  declarations: [VendorsListComponent, VendordetailComponent,VendordetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatComponentsModuleModule
  ],
  exports:[VendorsListComponent,VendordetailComponent]
})
export class VendorsModule { }
