import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBlockComponent } from './message-block.component';

describe('MessageBlockComponent', () => {
  let component: MessageBlockComponent;
  let fixture: ComponentFixture<MessageBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageBlockComponent]
    });
    fixture = TestBed.createComponent(MessageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
