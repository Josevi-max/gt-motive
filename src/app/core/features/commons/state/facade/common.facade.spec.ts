import { TestBed } from '@angular/core/testing';

import { CommonFacade } from './common.facade';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('CommonFacade', () => {
  let service: CommonFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),provideHttpClient()]
    });
    service = TestBed.inject(CommonFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
