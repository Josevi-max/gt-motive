import { TestBed } from '@angular/core/testing';

import { SearchEngine } from './search-engine';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SearchEngine', () => {
  let service: SearchEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(SearchEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
