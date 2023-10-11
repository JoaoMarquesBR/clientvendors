import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModuleModule } from 'src/app/shared/mat-components-module/mat-components-module.module';



@NgModule({
  declarations: [ProductHomeComponent,ProductDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatComponentsModuleModule
  ],
  exports:[ProductHomeComponent,ProductDetailsComponent]
})

export class ProductModule { }
