import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterInventoryComponent } from './meter-inventory.component';

describe('MeterInventoryComponent', () => {
  let component: MeterInventoryComponent;
  let fixture: ComponentFixture<MeterInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
