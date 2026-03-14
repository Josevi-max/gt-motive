import { TestBed } from '@angular/core/testing';

import { BrandDetailsFacade } from './brand-details.facade';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('BrandDetailsFacade', () => {
  let service: BrandDetailsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),provideHttpClient()]

    });
    service = TestBed.inject(BrandDetailsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
