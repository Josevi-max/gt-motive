import { TestBed } from '@angular/core/testing';

import { BrandDetailsFacade } from './brand-details.facade';

describe('BrandDetailsFacade', () => {
  let service: BrandDetailsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandDetailsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
