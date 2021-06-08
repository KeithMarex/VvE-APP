import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatorComponent } from './account-creator.component';

describe('AccountCreatorComponent', () => {
  let component: AccountCreatorComponent;
  let fixture: ComponentFixture<AccountCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
