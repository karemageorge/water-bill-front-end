import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillDetailsComponent } from './create-bill-details.component';

describe('CreateBillDetailsComponent', () => {
  let component: CreateBillDetailsComponent;
  let fixture: ComponentFixture<CreateBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBillDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
