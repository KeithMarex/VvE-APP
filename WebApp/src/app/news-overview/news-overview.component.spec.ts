import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsOverviewComponent } from './news-overview.component';

describe('NewsOverviewComponent', () => {
  let component: NewsOverviewComponent;
  let fixture: ComponentFixture<NewsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
