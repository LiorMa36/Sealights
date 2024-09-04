import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveUserInfoComponent } from './reactive-user-info.component';

describe('ReactiveUserNameComponent', () => {
  let component: ReactiveUserInfoComponent;
  let fixture: ComponentFixture<ReactiveUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveUserInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
