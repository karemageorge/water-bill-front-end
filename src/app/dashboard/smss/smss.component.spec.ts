import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmssComponent } from './smss.component';

describe('SmssComponent', () => {
  let component: SmssComponent;
  let fixture: ComponentFixture<SmssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
