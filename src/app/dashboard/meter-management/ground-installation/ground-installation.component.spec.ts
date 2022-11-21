import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundInstallationComponent } from './ground-installation.component';

describe('GroundInstallationComponent', () => {
  let component: GroundInstallationComponent;
  let fixture: ComponentFixture<GroundInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundInstallationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
