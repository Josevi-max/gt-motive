import { TestBed } from '@angular/core/testing';

import { HomeAdapters } from './home.adapters';

describe('HomeAdapters', () => {
  let service: HomeAdapters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAdapters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
