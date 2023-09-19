import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Vendor } from '../entities/Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  resourceURL: string;
  status: string;

  constructor(private http : HttpClient) {
      this.resourceURL = `${enviroment.baseurl}api/vendor`
      this.status = '';
   }

  getVendors(): Observable<Vendor[]>{
    return this.http
    .get<Vendor[]>(this.resourceURL)
    .pipe(retry(1), catchError(this.handleError));
  }

  updateVendor(vendor: Vendor): Observable<Vendor>{
    return this.http
    .put<Vendor>(this.resourceURL,vendor)
    .pipe(retry(1), catchError(this.handleError));
  }


  handleError(error: any) {
    let errorMessage = '';
    error.error instanceof ErrorEvent
      ? // Get client-side error
        (errorMessage = error.error.message)
      : // Get server-side error
        (errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`);
    window.alert(errorMessage); // will console.log when going into production
    return throwError(() => errorMessage);
  }

}
