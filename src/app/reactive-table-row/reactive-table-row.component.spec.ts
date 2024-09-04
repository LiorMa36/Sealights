import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTableRowComponent } from './reactive-table-row.component';

describe('ReactiveTableRowComponent', () => {
  let component: ReactiveTableRowComponent;
  let fixture: ComponentFixture<ReactiveTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
