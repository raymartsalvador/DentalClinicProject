import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventComponent } from './special-event.component';

describe('SpecialEventComponent', () => {
  let component: SpecialEventComponent;
  let fixture: ComponentFixture<SpecialEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialEventComponent]
    });
    fixture = TestBed.createComponent(SpecialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
