import { TestBed } from '@angular/core/testing';

import { HomeFacade } from './home.facade.js';

describe('HomeFacadeTs', () => {
  let service: HomeFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
