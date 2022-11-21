import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterRequestsComponent } from './add-meter-requests.component';

describe('AddMeterRequestsComponent', () => {
  let component: AddMeterRequestsComponent;
  let fixture: ComponentFixture<AddMeterRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeterRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeterRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
