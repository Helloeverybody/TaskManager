import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreationComponent } from './list-creation.component';

describe('ListComponent', () => {
  let component: ListCreationComponent;
  let fixture: ComponentFixture<ListCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
