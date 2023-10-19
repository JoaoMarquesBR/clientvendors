import { Component , OnInit} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/entities/Product';
import { HttpClient } from '@angular/common/http';
import { newProductService } from '../../../services/newProductService';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent{
  hideEditForm : boolean = true;
  msg : string = "loading"
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id','name','vendorid'];
  products: Product[] = [];
  product! : Product;

  constructor(private productService: newProductService){

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  select(selectedExpense: Product): void {
    this.product = selectedExpense;
    this.msg = `Expense ${selectedExpense.id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string): void {
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'operation cancelled';
  } // cancel
  /**
   * update - send changed update to service update local array
   */
  update(selectedExpense: Product): void {
    this.productService.update(selectedExpense).subscribe({
      // observer object
      next: (exp: Product) => {
        let msg = `Expense ${exp.id} updated!`;
        this.getAllProducts(msg);
      },
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // update
  /**
   * save - determine whether we're doing and add or an update
   */
  save(product: Product): void {
    console.log(product)
    let result = this.products.find(x=> x.id == product.id)

    result ? this.update(product) : this.add(product);
  } // save
  /**
   * add - send expense to service, receive newid back
   */
  add(newProduct: Product): void {
    this.msg = 'Adding expense...';
    this.productService.create(newProduct).subscribe({
      // observer object
      next: (exp: Product) => {
        let msg = '';
        exp.id != null
          ? (msg = `Expense ${exp.id} added!`)
          : (msg = `Expense ${exp.id} not added!`);
        this.getAllProducts(msg);
      },
      error: (err: Error) => (this.msg = `Expense not added! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // add
  /**
   * delete - send expense id to service for deletion
   */
  delete(selectedExpense: Product): void {
    this.productService.delete(selectedExpense.id).subscribe({
      // observer object
      next: (numOfExpensesDeleted: number) => {
        let msg = '';
        numOfExpensesDeleted === 1
          ? (msg = `Expense ${selectedExpense.id} deleted!`)
          : (msg = `Expense ${selectedExpense.id} not deleted!`);
        this.getAllProducts(msg);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // delete

  getAllProducts(passedMsg: string = ''): void {
    this.productService.getAll().subscribe({
      // Create observer object
      next: (products: Product[]) => {
        this.products = products;
        this.dataSource.data = this.products;
      },
      error: (err: Error) =>
        (this.msg = `Couldn't get expenses - ${err.message}`),
      complete: () =>
        passedMsg ? (this.msg = passedMsg) : (this.msg = `Expenses loaded!`),
    });
  } // getAllProducts

  sortExpensesWithObjectLiterals(sort: Sort): void {
    const literals = {
      // sort on id
      // id: () =>
        // (this.dataSource.data = this.dataSource.data.sort(
        //   (a: Product, b: Product) =>
        //     sort.direction === 'asc' ? a.id - b.id : b.id - a.id // descending
        // )),
      // sort on employeeid
      employeeid: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? a.vendorid - b.vendorid
              : b.vendorid - a.vendorid // descending
        )),
      // sort on dateincurred
      dateincurred: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? a.costprice < b.costprice
                ? -1
                : 1
              : b.costprice < a.costprice // descending
              ? -1
              : 1
        )),
    };
    literals[sort.active as keyof typeof literals]();
  } // sortExpensesWithObjectLiterals

  newProduct(): void {
    this.product = {
      id: '',
      vendorid : 0,
      costprice:0,
      eoq : 0,
      msrp:0,
      name:'',
      qoh:0,
      qoo:0,
      qrcode:'',
      qrcodetxt:'',
      rop:0
    };
    this.msg = 'New expense';
    this.hideEditForm = !this.hideEditForm;
  } // newExpense
}
