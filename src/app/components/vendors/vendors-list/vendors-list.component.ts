import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vendor } from 'src/app/entities/Vendor';

@Component({
  selector: 'app-vendors-list',
  template: `
    <mat-list-item
      *ngFor="let vendor of vendors"
      layout="row"
      class="pad-xs mat-title"
      (click) = "selected.emit(vendor)"
    >
    {{vendor.id}}  {{vendor.name}}
    </mat-list-item>
  `,
  styles: [],
})
export class VendorsListComponent {
  @Input() vendors?: Vendor[];
  @Output() selected = new EventEmitter();
}
