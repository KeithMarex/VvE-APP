import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOverviewComponent } from './calendar-overview.component';

describe('CalendarComponent', () => {
  let component: CalendarOverviewComponent;
  let fixture: ComponentFixture<CalendarOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
