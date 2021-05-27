import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketOverviewComponent } from './ticket-overview.component';

describe('TicketOverviewComponent', () => {
  let component: TicketOverviewComponent;
  let fixture: ComponentFixture<TicketOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
