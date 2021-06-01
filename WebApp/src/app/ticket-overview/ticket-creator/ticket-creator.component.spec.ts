import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreatorComponent } from './ticket-creator.component';

describe('TicketCreatorComponent', () => {
  let component: TicketCreatorComponent;
  let fixture: ComponentFixture<TicketCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
