import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightnavbarComponent } from './rightnavbar.component';

describe('RightnavbarComponent', () => {
  let component: RightnavbarComponent;
  let fixture: ComponentFixture<RightnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightnavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
