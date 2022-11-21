import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuingApprovalComponent } from './issuing-approval.component';

describe('IssuingApprovalComponent', () => {
  let component: IssuingApprovalComponent;
  let fixture: ComponentFixture<IssuingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuingApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
