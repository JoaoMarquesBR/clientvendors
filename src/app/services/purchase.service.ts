import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from '../entities/PurchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends GenericHttpService<PurchaseOrder> {
  constructor(httpClient : HttpClient) {
    super(httpClient,"reports")
   }
}
