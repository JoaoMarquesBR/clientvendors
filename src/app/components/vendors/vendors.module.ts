import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { MatComponentsModuleModule } from 'src/app/shared/mat-components-module/mat-components-module.module';



@NgModule({
  declarations: [VendorsListComponent],
  imports: [
    CommonModule,
    MatComponentsModuleModule
  ],
  exports:[VendorsListComponent]
})
export class VendorsModule { }
