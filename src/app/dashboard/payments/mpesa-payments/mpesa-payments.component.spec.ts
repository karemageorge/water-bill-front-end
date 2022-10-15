import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaPaymentsComponent } from './mpesa-payments.component';

describe('MpesaPaymentsComponent', () => {
  let component: MpesaPaymentsComponent;
  let fixture: ComponentFixture<MpesaPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpesaPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpesaPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
