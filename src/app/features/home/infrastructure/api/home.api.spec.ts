import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { HomeApi } from './home.api';

describe('HomeApi', () => {
  let service: HomeApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient()
      ]
    });

    service = TestBed.inject(HomeApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});