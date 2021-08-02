import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryAddComponent } from './time-entry-add.component';

describe('TimeEntryAddComponent', () => {
  let component: TimeEntryAddComponent;
  let fixture: ComponentFixture<TimeEntryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeEntryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
