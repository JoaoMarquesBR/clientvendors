import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/entities/Vendor';
import { NewVendorService } from 'src/app/services/newVendorService';

@Component({
  selector: 'app-vendors-home',
  templateUrl: './vendors-home.component.html',
  styleUrls: ['./vendors-home.component.scss']
})
export class VendorsHomeComponent implements OnInit {
  vendors : Vendor[] = []
  vendor : Vendor
  msg : string
  hideEditForm : boolean
  todo? : string

  constructor(private service : NewVendorService){
    this.msg='';
    this.hideEditForm = true;
    this.todo = '';
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
    this.getAll();
  }

  select(vendor: Vendor): void {
    this.hideEditForm = false;
    this.msg=vendor.id +" selected"
    this.vendor = vendor;
    this.todo="update"
  }

  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
  }

  update(newVendorValues: Vendor): void {
    this.service.update(newVendorValues).subscribe({
      // Create observer object
      next: (vendor: Vendor) => {
        this.msg = `Employee ${vendor.id} updated!`;
      },
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  }

  getAll(passedMsg: string = ''): void {
    this.service.getAll().subscribe({
      // Create observer object
      next: (vendors: Vendor[]) => {
        this.vendors = vendors;
      },
      error: (err: Error) =>
        (this.msg = `Couldn't get vendors - ${err.message}`),
      complete: () =>
        passedMsg ? (this.msg = passedMsg) : (this.msg = `vendors loaded!`),
    });
  }

  save(vendor: Vendor): void {
    vendor.id ? this.update(vendor) : this.add(vendor);
  } // save

  add(vendor: Vendor): void {
    vendor.id = 0;
    this.service.create(vendor).subscribe({
      // Create observer object
      next: (vendor: Vendor) => {
        this.getAll(`Vendor ${vendor.id} added!`);
      },
      error: (err: Error) =>
        (this.msg = `Vendors not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm), // this calls unsubscribe
    });

  }

  delete(vendor: Vendor): void {
    this.service.delete(vendor.id).subscribe({
      // Create observer object
      next: (numOfVendorsDeleted: number) => {
        let msg: string = '';
        numOfVendorsDeleted === 1
          ? (msg = `Vendor ${vendor.name} deleted!`)
          : (msg = `Vendor ${vendor.name} not deleted!`);
        this.getAll(msg);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
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
}
