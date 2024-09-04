import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveUserFormComponent } from './reactive-user-form.component';

describe('ReactiveUserFormComponent', () => {
  let component: ReactiveUserFormComponent;
  let fixture: ComponentFixture<ReactiveUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveUserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
