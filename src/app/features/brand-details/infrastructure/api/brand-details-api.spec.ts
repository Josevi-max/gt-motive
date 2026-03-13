import { TestBed } from '@angular/core/testing';

import { BrandDetailsApi } from './brand-details-api';

describe('BrandDetailsApi', () => {
  let service: BrandDetailsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandDetailsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
