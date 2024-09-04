import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveAddressesComponent } from './reactive-addresses.component';

describe('ReactiveAddressesComponent', () => {
  let component: ReactiveAddressesComponent;
  let fixture: ComponentFixture<ReactiveAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveAddressesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
