import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VveManagementComponent } from './vve-management.component';

describe('VveManagementComponent', () => {
  let component: VveManagementComponent;
  let fixture: ComponentFixture<VveManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VveManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
