import { TestBed } from '@angular/core/testing';

import { CnApiServiceService } from './cn-api-service.service';

describe('CnApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CnApiServiceService = TestBed.get(CnApiServiceService);
    expect(service).toBeTruthy();
  });
});
