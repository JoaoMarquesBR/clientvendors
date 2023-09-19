import { Component, OnInit } from '@angular/core';
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
  msg : string
  hideEditForm : boolean

  constructor(private service : VendorsService){
    this.vendors=[]
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

  select(vendor: Vendor):void{
    this.hideEditForm = false;
    this.msg=vendor.id +" selected"
    this.vendor = vendor;
  }

  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
  }


  update(newVendorValues: Vendor): void {

    this.service.updateVendor(newVendorValues).subscribe({
      next: (vendor: Vendor) => (this.msg = `Vendor ${vendor.name} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    })
  } //
}
