import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarItemCreatorComponent } from './calendar-item-creator.component';

describe('CalendarItemCreatorComponent', () => {
  let component: CalendarItemCreatorComponent;
  let fixture: ComponentFixture<CalendarItemCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarItemCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarItemCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
