import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsOverviewComponent } from './tags-overview.component';

describe('TicketListComponent', () => {
  let component: TagsOverviewComponent;
  let fixture: ComponentFixture<TagsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});