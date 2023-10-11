import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GenericHttpService } from './generic-http.service';
import { Product } from '../entities/Product';

@Injectable({
  providedIn: 'root',
})
export class newProductService extends GenericHttpService<Product> {
  constructor(httpClient: HttpClient) {
    super(httpClient,`products`)
  }

}
