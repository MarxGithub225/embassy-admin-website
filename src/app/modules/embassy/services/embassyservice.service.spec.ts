import { TestBed } from '@angular/core/testing';

import { EmbassyserviceService } from './embassyservice.service';

describe('EmbassyserviceService', () => {
  let service: EmbassyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbassyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
