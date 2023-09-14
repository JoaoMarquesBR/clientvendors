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
  msg : string

  constructor(private service : VendorsService){
    this.vendors=[]
    this.msg='';
  }

  ngOnInit(): void {

    this.service.getVendors().subscribe({

      next:(payload:any)=>{
        this.vendors = payload._embedded.vendors;
        this.msg = "Vendors loaded"

        console.log(this.vendors)
      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
      complete: () => {},
    })

  }


}
