import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentExceptionsComponent } from './payment-exceptions.component';

describe('PaymentExceptionsComponent', () => {
  let component: PaymentExceptionsComponent;
  let fixture: ComponentFixture<PaymentExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentExceptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
