import { TestBed } from '@angular/core/testing';

import { CommonFacade } from './common.facade';

describe('CommonFacade', () => {
  let service: CommonFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
