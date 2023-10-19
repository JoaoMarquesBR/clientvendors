import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VendorsHomeComponent } from './components/vendors/vendors-home/vendors-home.component';
import { ProductHomeComponent } from './components/product/product-home/product-home.component';
import { GeneratorComponent } from './components/generator/generator.component';

const routes: Routes = [
  {path:'',component:HomeComponent,title:"casestudy - home"},
  {path:'home',component:HomeComponent,title:"casestudy - home"},
  {path:'vendors',component:VendorsHomeComponent,title:"casestudy - vendors"},
  {path:'products',component:ProductHomeComponent,title:"casestudy - products"},
  {path:'generator',component:GeneratorComponent,title:"casestudy - generator"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
