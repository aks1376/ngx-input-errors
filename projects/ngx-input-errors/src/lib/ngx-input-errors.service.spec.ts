import { TestBed } from '@angular/core/testing';

import { NgxInputErrorsService } from './ngx-input-errors.service';

describe('NgxInputErrorsService', () => {
  let service: NgxInputErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxInputErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
