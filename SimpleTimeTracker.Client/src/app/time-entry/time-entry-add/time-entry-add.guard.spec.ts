import { TestBed } from '@angular/core/testing';

import { TimeEntryAddGuard } from './time-entry-add.guard';

describe('TimeEntryAddGuard', () => {
  let guard: TimeEntryAddGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimeEntryAddGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
