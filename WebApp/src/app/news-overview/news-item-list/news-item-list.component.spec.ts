import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemListComponent } from './news-item-list.component';

describe('NewsItemListComponent', () => {
  let component: NewsItemListComponent;
  let fixture: ComponentFixture<NewsItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
