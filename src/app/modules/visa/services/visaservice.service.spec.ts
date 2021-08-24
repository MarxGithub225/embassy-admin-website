import { TestBed } from '@angular/core/testing';

import { VisaserviceService } from './visaservice.service';

describe('VisaserviceService', () => {
  let service: VisaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
