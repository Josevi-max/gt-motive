import { TestBed } from '@angular/core/testing';

import { HomeFacade } from './home.facade.js';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('HomeFacadeTs', () => {
  let service: HomeFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),provideHttpClient()]

    });
    service = TestBed.inject(HomeFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
