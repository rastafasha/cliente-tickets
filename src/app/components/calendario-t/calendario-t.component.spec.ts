import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioTComponent } from './calendario-t.component';

describe('CalendarioTComponent', () => {
  let component: CalendarioTComponent;
  let fixture: ComponentFixture<CalendarioTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
