import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatientsComponent } from './manage-patients.component';

describe('ManagePatientsComponent', () => {
  let component: ManagePatientsComponent;
  let fixture: ComponentFixture<ManagePatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePatientsComponent]
    });
    fixture = TestBed.createComponent(ManagePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
