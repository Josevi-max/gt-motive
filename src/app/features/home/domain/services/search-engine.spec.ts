import { TestBed } from '@angular/core/testing';

import { SearchEngine } from './search-engine';

describe('SearchEngine', () => {
  let service: SearchEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
