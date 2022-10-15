import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEnqueryComponent } from './customer-enquery.component';

describe('CustomerEnqueryComponent', () => {
  let component: CustomerEnqueryComponent;
  let fixture: ComponentFixture<CustomerEnqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEnqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEnqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
