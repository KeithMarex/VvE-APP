import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSvgComponent } from './test-svg.component';

describe('TestSvgComponent', () => {
  let component: TestSvgComponent;
  let fixture: ComponentFixture<TestSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
