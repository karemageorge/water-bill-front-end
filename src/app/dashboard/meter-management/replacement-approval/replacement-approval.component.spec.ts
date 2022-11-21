import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementApprovalComponent } from './replacement-approval.component';

describe('ReplacementApprovalComponent', () => {
  let component: ReplacementApprovalComponent;
  let fixture: ComponentFixture<ReplacementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplacementApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
