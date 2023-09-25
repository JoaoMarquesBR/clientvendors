import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Vendor } from 'src/app/entities/Vendor';

@Component({
  selector: 'app-vendordetail',
  templateUrl: './vendordetail.component.html',
  styleUrls: ['./vendordetail.component.css']
})
export class VendordetailComponent implements OnInit{
  @Input() selectedVendor : Vendor = {
    id: 0,
    name: '',
    city: '',
    province: '',
    postalcode: '',
    phone: '',
    type: '',
    email: '',
    address1:'',
  }
  @Input() vendors: Vendor[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();

  vendorForm: FormGroup;
  name : FormControl;
  address1 : FormControl;
  city : FormControl;
  province : FormControl;
  postalcode : FormControl;
  phone : FormControl;
  type : FormControl;
  email : FormControl;


  ngOnInit(): void {
    this.vendorForm.patchValue({
      name : this.selectedVendor.name,
      address1 : this.selectedVendor.address1,
      city : this.selectedVendor.city,
      province : this.selectedVendor.province,
      postalcode : this.selectedVendor.postalcode,
      phone : this.selectedVendor.phone,
      type : this.selectedVendor.type,
      email : this.selectedVendor.email
    })
  }

  // name : string

  constructor(private builder : FormBuilder){
    this.name = new FormControl('');
    this.address1 = new FormControl('');
    this.city = new FormControl('');
    this.province = new FormControl('');
    this.postalcode = new FormControl('');
    this.phone = new FormControl('');
    this.type = new FormControl('');
    this.email = new FormControl('');

    this.vendorForm = new FormGroup({
      name: this.name,
      city: this.city,
      province: this.province,
      postalcode:  this.postalcode,
      address1 : this.address1,
      phone:  this.phone,
      type:  this.type,
      email:  this.email,
    })

  }

  updateSelectedEmployee(): void {
    this.selectedVendor.name = this.vendorForm.value.name;
    this.selectedVendor.city = this.vendorForm.value.city;
    this.selectedVendor.province = this.vendorForm.value.province;
    this.selectedVendor.postalcode = this.vendorForm.value.postalcode;
    this.selectedVendor.address1 = this.vendorForm.value.address1;
    this.selectedVendor.phone = this.vendorForm.value.phone;
    this.selectedVendor.type = this.vendorForm.value.type;
    this.selectedVendor.email = this.vendorForm.value.email;
    this.saved.emit(this.selectedVendor);
  }

}
