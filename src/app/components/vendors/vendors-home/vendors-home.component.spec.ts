import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsHomeComponent } from './vendors-home.component';

describe('VendorsHomeComponent', () => {
  let component: VendorsHomeComponent;
  let fixture: ComponentFixture<VendorsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorsHomeComponent]
    });
    fixture = TestBed.createComponent(VendorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
