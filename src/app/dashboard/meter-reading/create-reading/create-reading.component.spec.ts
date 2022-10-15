import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReadingComponent } from './create-reading.component';

describe('CreateReadingComponent', () => {
  let component: CreateReadingComponent;
  let fixture: ComponentFixture<CreateReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
