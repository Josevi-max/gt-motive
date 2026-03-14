import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CommonApi } from './common.api';
import { GetAllMakesResponse } from '../models/common.dto';
import { config } from '../../../../../config/config';

describe('CommonApi', () => {
  let service: CommonApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CommonApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllMakes and return Observable with response', (done) => {
    const mockApiResponse: GetAllMakesResponse = {
      Count: 3,
      Message: 'Response returned successfully',
      SearchCriteria: null,
      Results: [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Honda' },
        { Make_ID: 3, Make_Name: 'Ford' }
      ]
    };

    service.getAllMakes().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
      expect(response.Results.length).toBe(3);
      expect(response.Results[0].Make_Name).toBe('Toyota');
      done();
    });

    const req = httpMock.expectOne(config.api.URL_BACKEND + '/vehicles/getallmakes?format=json');

    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);
  });

  it('should handle HTTP error gracefully', (done) => {
    const errorMessage = 'Network error';

    service.getAllMakes().subscribe({
      next: () => {
        fail('Expected error, but got success');
      },
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
        done();
      }
    });

    const req = httpMock.expectOne(config.api.URL_BACKEND + '/vehicles/getallmakes?format=json');

    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should construct the correct URL', () => {
    const expectedUrl = config.api.URL_BACKEND + '/vehicles/getallmakes?format=json';

    service.getAllMakes().subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.url).toBe(expectedUrl);
    expect(req.request.method).toBe('GET');

    req.flush({ Results: [] });
  });
});