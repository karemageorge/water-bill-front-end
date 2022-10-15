import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMeterComponent } from './read-meter.component';

describe('ReadMeterComponent', () => {
  let component: ReadMeterComponent;
  let fixture: ComponentFixture<ReadMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
