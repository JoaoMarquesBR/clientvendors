import { Component, OnInit } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { Observable, catchError } from 'rxjs';
import { Vendor } from 'src/app/entities/Vendor';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-vendors-home',
  templateUrl: './vendors-home.component.html',
  styleUrls: ['./vendors-home.component.scss']
})
export class VendorsHomeComponent implements OnInit {
  vendors : Array<Vendor>
  vendor : Vendor
  vendors$?:Observable<Vendor[]>
  msg : string
  hideEditForm : boolean
  todo? : string

  constructor(private service : VendorsService){
    this.vendors=[];

    (this.vendors$=this.service.getVendors()),
    catchError((err)=> (this.msg=err.message))

    this.msg='';
    this.hideEditForm = true;

    this.vendor={
      id : 0,
      name: '',
      city:  '',
      province:  '',
      postalcode:   '',
      phone:   '',
      type:   '',
      email:  '',
      address1:'',
    }
  }

  ngOnInit(): void {

    this.service.getVendors().subscribe({
      next:(payload:any)=>{
        this.vendors = payload;
        this.msg = "Vendors loaded"

        // console.log(this.vendors)
      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
      complete: () => {},
    })

  }

  newVendor():void{
    this.vendor={
      id : 0,
      name: '',
      city:  '',
      province:  '',
      postalcode:   '',
      phone:   '',
      type:   '',
      email:  '',
      address1:'',
    }
    this.hideEditForm = !this.hideEditForm
    this.msg = 'New Vendor'
  }

  save(vendor : Vendor):void{
    this.vendor.id? this.update(vendor): this.add(vendor)
  }

  select(vendor: Vendor):void{
    this.hideEditForm = false;
    this.msg=vendor.id +" selected"
    this.vendor = vendor;
    this.todo="update"
  }

  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
  }

  add(vendor : Vendor):void{
    vendor.id=0;
    this.service.addVendor(vendor).subscribe({
      next: (emp : Vendor)=>{
        this.msg = `Vendor ${emp.name} was added!`
      },
      error: (err: Error)=>(this.msg=`Vendor not added - ${err.message}`),
      complete:()=>(this.hideEditForm = !this.hideEditForm)
    })
  }

  delete(vendor: Vendor): void {
    this.service.deleteVendor(vendor.id).subscribe({
      next:(numOfVendorsDeleted : number)=>{
        numOfVendorsDeleted ===1 ? (this.msg=`Vendor ${vendor.name} deleted!!`) : (this.msg=`Vendor not deleted}`)
      },
      error: (err : Error)=> (this.hideEditForm = !this.hideEditForm),
      complete:()=>(this.hideEditForm = !this.hideEditForm),
    })

  }

  update(newVendorValues: Vendor): void {

    this.service.updateVendor(newVendorValues).subscribe({
      next: (vendor: Vendor) => (this.msg = `Vendor ${vendor.name} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    })
  } //
}
