import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendbillComponent } from './sendbill.component';

describe('SendbillComponent', () => {
  let component: SendbillComponent;
  let fixture: ComponentFixture<SendbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
