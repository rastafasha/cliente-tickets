import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsuserComponent } from './eventsuser.component';

describe('EventsuserComponent', () => {
  let component: EventsuserComponent;
  let fixture: ComponentFixture<EventsuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
