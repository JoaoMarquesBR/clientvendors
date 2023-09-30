import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GenericHttpService } from './generic-http.service';
import { Vendor } from '../entities/Vendor';

@Injectable({
  providedIn: 'root',
})
export class NewVendorService extends GenericHttpService<Vendor> {
  constructor(httpClient: HttpClient) {
    super(httpClient,`vendors`)
  }

}
