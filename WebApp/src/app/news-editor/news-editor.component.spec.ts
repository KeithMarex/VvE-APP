import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCreateComponent } from './news-editor.component';

describe('NewsCreateComponent', () => {
  let component: NewsCreateComponent;
  let fixture: ComponentFixture<NewsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
