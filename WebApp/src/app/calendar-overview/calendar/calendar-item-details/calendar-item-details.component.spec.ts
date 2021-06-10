import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarItemDetailsComponent } from './calendar-item-details.component';

describe('CalendarItemDetailsComponent', () => {
  let component: CalendarItemDetailsComponent;
  let fixture: ComponentFixture<CalendarItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
