import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsPullComponent } from './lists-pull.component';

describe('ListsPulComponent', () => {
  let component: ListsPullComponent;
  let fixture: ComponentFixture<ListsPullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsPullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsPullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
