import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewerComponent } from './sewer.component';

describe('SewerComponent', () => {
  let component: SewerComponent;
  let fixture: ComponentFixture<SewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
