import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModuleModule } from '../../shared/mat-components-module/mat-components-module.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewVendorService } from 'src/app/services/newVendorService';
import { newProductService } from 'src/app/services/newProductService';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Product } from 'src/app/entities/Product';
import { Vendor } from 'src/app/entities/Vendor';
import { PurchaseOrder } from 'src/app/entities/PurchaseOrder';
import { PurchaseOrderLineItem } from 'src/app/entities/PurchaseOrderLineItem';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, MatComponentsModuleModule, ReactiveFormsModule],
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent {
  // form
  generatorForm: FormGroup;
  employeeid: FormControl;
  expenseid: FormControl;
  qtyControl: FormControl;

  // data
  formSubscription?: Subscription;
  products: Product[] = []; // everybody's expenses
  vendors: Vendor[] = []; // all employees
  vendorProducts: Product[] = []; // all expenses for a particular employee
  items: PurchaseOrderLineItem[] = []; // expense items that will be in report
  selectedProducts: Product[] = []; // expenses that being displayed currently in app
  selectedProduct: Product; // the current selected expense
  selectedVendor: Vendor; // the current selected employee
  registeredProducts: PurchaseOrderLineItem[]= [];
  qtySelected : number = 1;

  // misc
  pickedExpense: boolean;
  pickedProduct: boolean = false;
  pickedEmployee: boolean;
  generated: boolean;
  hasExpenses: boolean;
  hasProducts: boolean = false;

  msg: string;
  total: number;
  reportno: number = 0;

  qty: number = 0;

  numberArray?: number[] = Array(this.qty).fill(0).map((x, i) => i + 1);


  constructor(
    private builder: FormBuilder,
    private vendorService: NewVendorService,
    private expenseService: newProductService,
    private reportService: PurchaseService
  ) {
    this.pickedEmployee = false;
    this.pickedExpense = false;
    this.generated = false;
    this.msg = '';
    this.employeeid = new FormControl('');
    this.expenseid = new FormControl('');
    this.qtyControl = new FormControl(0);
    this.generatorForm = this.builder.group({
      expenseid: this.expenseid,
      employeeid: this.employeeid,
      qtyControl : this.qty
    });
    this.selectedProduct = {
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
    this.selectedVendor = {
      id: 0,
      name: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      email: '',
      type: '',
      address1: '',
    };
    this.hasExpenses = false;
    this.total = 0.0;
  } // constructor
  ngOnInit(): void {
    this.onPickEmployee(); // sets up subscription for dropdown click
    this.onPickExpense(); // sets up subscription for dropdown click
    this.msg = 'loading employees from server...';
    this.getAllEmployees();
    this.onPickProduct(null);
  } // ngOnInit
  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy
  /**
   * getAllEmployees - retrieve everything
   */
  getAllEmployees(passedMsg: string = ''): void {
    this.vendorService.getAll().subscribe({
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

  /**
   * loadEmployeeExpenses - retrieve a particular employee's expenses
   */
  loadEmployeeExpenses(): void {
    this.vendorProducts = [];
    this.expenseService.getSome(this.selectedVendor.id).subscribe({
      // observer object
      next: (expenses: Product[]) => {
        this.vendorProducts = expenses;
        this.qty = this.vendorProducts[0].qoh
        this.numberArray =  Array(this.qty).fill(0).map((x, i) => i + 1);
      },
      error: (err: Error) =>
        (this.msg = `product fetch failed! - ${err.message}`),
      complete: () => {},
    });
  } // loadEmployeeExpenses
  /**
   * onPickEmployee - Another way to use Observables, subscribe to the select change event
   * then load specific employee expenses for subsequent selection
   */
  onPickEmployee(): void {
    this.formSubscription = this.generatorForm
      .get('employeeid')
      ?.valueChanges.subscribe((val) => {
        this.selectedVendor = {
          id: 0,
          name: '',
          city: '',
          province: '',
          postalcode: '',
          phone: '',
          email: '',
          type: '',
          address1: '',
        };
        this.selectedVendor = val;
        this.loadEmployeeExpenses();
        this.pickedExpense = false;
        this.hasExpenses = false;
        this.msg = 'choose expense for employee';
        this.pickedEmployee = true;
        this.generated = false;
        this.items = []; // array for the report
        this.selectedProducts = []; // array for the details in app html
      });
  } // onPickEmployee
  /**
   * onPickExpense - subscribe to the select change event then
   * update array containing items.
   */

  onPickProduct(event: any): void {

    let index = this.vendorProducts.findIndex(x=>x.id == event.value.id)

    if(index != -1){
      this.qty = this.vendorProducts[index].qoh
      this.numberArray =  Array(this.qty).fill(0).map((x, i) => i + 1);
      this.pickedProduct = true;
    }

    const expenseSubscription = this.generatorForm
    .get('expenseid')
    ?.valueChanges.subscribe((val) => {
      this.selectedProduct = val;
    })


  }

  onPickExpense(): void {
    const expenseSubscription = this.generatorForm
      .get('qtyControl')
      ?.valueChanges.subscribe((val) => {
        this.hasExpenses = true;

        const selectedValue = val;
        this.qtySelected = selectedValue;

        if (
          this.items.find((item) => item.productid === this.selectedProduct?.id)
        )
        this.total =0;
        this.selectedProducts.forEach((exp) => (this.total += exp.msrp));
      });


    this.formSubscription?.add(expenseSubscription); // add it as a child, so all can be destroyed together

  } // onPickExpense
  /**
   * createReport - create the client side report
   */

  addProduct():void{
    this.hasProducts = true;

    const item: Product = {
      id: this.selectedProduct.id,
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
      // expenseid: this.selectedExpense?.id,
    };

    const orderLine: PurchaseOrderLineItem = {
      id: this.selectedVendor.id,
      poid: 0,
      productid: item.id,
      qty: this.qtySelected,
      price: this.selectedProduct.msrp*this.qty,
    };


    this.items.push(orderLine);
    this.registeredProducts.push(orderLine);

    this.total = 0;
    this.registeredProducts.forEach((exp) => (this.total += exp.price));
  }

  createReport(): void {
    this.generated = false;
    const purchase: PurchaseOrder = {
      id: this.selectedVendor.id,
      vendorid: this.selectedProduct.vendorid,
      amount: this.total,
      items: this.items,
    };

    this.reportService.create(purchase).subscribe({
      // observer object
      next: (purchase: PurchaseOrder) => {
        // server should be returning report with new id
        purchase.id > 0
          ? (this.msg = `Purchase ${purchase.id} added!`)
          : (this.msg = 'Purchase not added! - server error');
        this.reportno = purchase.id;
      },
      error: (err: Error) => (this.msg = `Report not added! - ${err.message}`),
      complete: () => {
        this.hasExpenses = false;
        this.pickedEmployee = true;
        this.pickedExpense = false;
        this.generated = true;
        this.total  = 0 ;
        this.qty = 0;
        this.registeredProducts=[];
        this.selectedProducts = [];
        this.hasProducts=false;
      },
    });


  } // createReport
}
