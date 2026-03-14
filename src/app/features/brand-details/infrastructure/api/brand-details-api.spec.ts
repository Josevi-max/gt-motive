import { TestBed } from '@angular/core/testing';

import { BrandDetailsApi } from './brand-details-api';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('BrandDetailsApi', () => {
  let service: BrandDetailsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),provideHttpClient()]
    });
    service = TestBed.inject(BrandDetailsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
