import { Vendor } from './../../../entities/Vendor';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/Product';
import { AbstractControl, ReactiveFormsModule, Validator } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NewVendorService } from 'src/app/services/newVendorService';
import { newProductService } from 'src/app/services/newProductService';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  //products
  products: Product[] = [];

  //forms
  productForm: FormGroup;

  productName: FormControl;
  productId: FormControl;
  vendor: FormControl;
  retailPrice: FormControl;
  costPrice: FormControl;
  rop : FormControl;
  eoq : FormControl;
  qoo: FormControl;
  qoh : FormControl;

  //vendors part
  vendors: Vendor[] = [];
  vendorSelected: Vendor | undefined;

  panelOpenState = false;


  @Input() selectedProduct: Product = {
    id: '',
    vendorid: 0,
    name: '',
    costprice: 0,
    msrp: 0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0,
    qrcode: '',
    qrcodetxt: '',
  };
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(
    private builder: FormBuilder,
    private vendorService: NewVendorService,
    private productService: newProductService
  ) {
    this.productId = new FormControl('',Validators.compose([this.uniqueCodeValidator.bind(this),Validators.required]));
    this.vendor = new FormControl('',Validators.compose([Validators.required]));
    this.retailPrice = new FormControl('', Validators.pattern(/^\d+(\.\d{1,2})?$/));
    this.costPrice = new FormControl('', Validators.pattern(/^\d+(\.\d{1,2})?$/));
    this.productName = new FormControl('',Validators.required);
    this.rop = new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]);
    this.eoq = new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]);
    this.qoo = new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]);
    this.qoh = new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]);

    this.productForm = new FormGroup({
      productId: this.productId,
      vendor: this.vendor,
      productName: this.productName,
      retailPrice: this.retailPrice,
      costPrice: this.costPrice,
      eoq: this.eoq,
      rop : this.rop,
      qoh : this.qoh,
      qoo : this.qoo
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      // Create observer object
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err: Error) => console.log('error of products as ' + err.message),
    });

    this.vendorService.getAll().subscribe((resp) => {
      this.vendors = resp;
      if (this.selectedProduct.vendorid != null) {
        this.vendorSelected = this.vendors.find(
          (x) => x.id === this.selectedProduct.vendorid
        );
      }

      this.productForm.patchValue({
        productId: this.selectedProduct.id,
        vendor: this.vendorSelected?.id,
        productName: this.selectedProduct.name,
        retailPrice: this.selectedProduct.rop,
        costPrice: this.selectedProduct.costprice,
        eoq: this.selectedProduct.eoq,
        qoo: this.selectedProduct.qoo,
        qoh: this.selectedProduct.qoh,
        rop: this.selectedProduct.rop,
      });
    });
  }

  updateSelectedProduct(): void {
    this.selectedProduct.id = this.productForm.value.productId;

    console.log("x")
    console.log(this.productForm.value.vendor)
    console.log("y")

    this.vendorSelected = this.vendors.find(
      (x) => x.id === this.productForm.value.vendor
    );
    if (this.vendorSelected != undefined) {
      this.selectedProduct.vendorid = this.vendorSelected?.id;
    }
    this.selectedProduct.name = this.productForm.value.productName;
    this.selectedProduct.rop = this.productForm.value.retailPrice;
    this.selectedProduct.costprice = this.productForm.value.costPrice;

    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoo  = this.productForm.value.qoo;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.rop = this.productForm.value.rop;


    this.saved.emit(this.selectedProduct);
  }

  uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {
    /**
     * uniqueCodeValidator - needed access to products property so not
     * with the rest of the validators
     */
    if (this.products && this.products?.length > 0) {
      if (
        this.products.find(
          (p) => p.id === control.value && !this.selectedProduct.id
        ) !== undefined
      ) {
        return { idExists: true };
      }
    }
    return null; // if we make it here there are no product codes
  } // uniqueCodeValidator
}
