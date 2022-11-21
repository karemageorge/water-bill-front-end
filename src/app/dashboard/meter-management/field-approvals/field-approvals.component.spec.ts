import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldApprovalsComponent } from './field-approvals.component';

describe('FieldApprovalsComponent', () => {
  let component: FieldApprovalsComponent;
  let fixture: ComponentFixture<FieldApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
