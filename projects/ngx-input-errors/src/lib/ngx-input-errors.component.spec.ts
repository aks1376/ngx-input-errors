import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInputErrorsComponent } from './ngx-input-errors.component';

describe('NgxInputErrorsComponent', () => {
  let component: NgxInputErrorsComponent;
  let fixture: ComponentFixture<NgxInputErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxInputErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
