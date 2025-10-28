import { TestBed } from '@angular/core/testing';

import { CalendariotareaService } from './calendariotarea.service';

describe('CalendariotareaService', () => {
  let service: CalendariotareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendariotareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
