import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreApprovalsComponent } from './store-approvals.component';

describe('StoreApprovalsComponent', () => {
  let component: StoreApprovalsComponent;
  let fixture: ComponentFixture<StoreApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
