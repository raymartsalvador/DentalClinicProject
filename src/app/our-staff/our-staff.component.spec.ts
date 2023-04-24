import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurStaffComponent } from './our-staff.component';

describe('OurStaffComponent', () => {
  let component: OurStaffComponent;
  let fixture: ComponentFixture<OurStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
