import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityPaymentsComponent } from './equity-payments.component';

describe('EquityPaymentsComponent', () => {
  let component: EquityPaymentsComponent;
  let fixture: ComponentFixture<EquityPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquityPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquityPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
