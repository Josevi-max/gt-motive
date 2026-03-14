import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { CommonApi } from './common.api';

describe('CommonApi', () => {
  let service: CommonApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient()
      ]
    });

    service = TestBed.inject(CommonApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});