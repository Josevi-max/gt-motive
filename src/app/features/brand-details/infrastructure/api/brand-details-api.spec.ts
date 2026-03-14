import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { BrandDetailsApi } from './brand-details-api';
import { BrandDetailsApiResponse, TypesVehicleApiResponse } from '../models/brand-details.dto';
import { config } from '../../../../config/config';

describe('BrandDetailsApi', () => {
  let service: BrandDetailsApi;
  let httpMock: HttpTestingController;

  const mockBrandId = 123;
  const mockBrandDetailsResponse: BrandDetailsApiResponse = {
    Count: 2,
    Message: 'Response returned successfully',
    SearchCriteria: '',
    Results: [
      { Make_ID: 123, Make_Name: 'Toyota', Model_ID: 1, Model_Name: 'Corolla' },
      { Make_ID: 123, Make_Name: 'Toyota', Model_ID: 2, Model_Name: 'Camry' }
    ]
  };

  const mockTypesResponse: TypesVehicleApiResponse = {
    Count: 2,
    Message: 'Response returned successfully',
    SearchCriteria: '',
    Results: [
      { VehicleTypeId: 1, VehicleTypeName: 'Passenger Car' },
      { VehicleTypeId: 2, VehicleTypeName: 'SUV' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BrandDetailsApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBrandDetails', () => {
    it('should call getBrandDetails with correct URL and return Observable with response', (done) => {
      const expectedUrl = `${config.api.URL_BACKEND}/vehicles/getmodelsformakeid/${mockBrandId}?format=json`;

      service.getBrandDetails(mockBrandId).subscribe({
        next: (response) => {
          expect(response).toEqual(mockBrandDetailsResponse);
          expect(response.Results.length).toBe(2);
          expect(response.Results[0].Model_Name).toBe('Corolla');
          done();
        },
        error: () => {
          fail('Expected success, but got error');
        }
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(expectedUrl);
      
      req.flush(mockBrandDetailsResponse);
    });

    it('should handle error when getBrandDetails fails', (done) => {
      const expectedUrl = `${config.api.URL_BACKEND}/vehicles/getmodelsformakeid/${mockBrandId}?format=json`;
      const errorMessage = 'Brand not found';

      service.getBrandDetails(mockBrandId).subscribe({
        next: () => {
          fail('Expected error, but got success');
        },
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
          done();
        }
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

    it('should construct correct URL with different brand IDs', () => {
      const differentBrandId = 456;
      const expectedUrl = `${config.api.URL_BACKEND}/vehicles/getmodelsformakeid/${differentBrandId}?format=json`;

      service.getBrandDetails(differentBrandId).subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.url).toContain(`getmodelsformakeid/${differentBrandId}`);
      expect(req.request.url).toContain('format=json');
      
      req.flush({ Results: [] });
    });
  });

  describe('getVehicleTypesForBrand', () => {
    it('should call getVehicleTypesForBrand with correct URL and return Observable with response', (done) => {
      const expectedUrl = `${config.api.URL_BACKEND}/vehicles/getvehicletypesformakeid/${mockBrandId}?format=json`;

      service.getVehicleTypesForBrand(mockBrandId).subscribe({
        next: (response) => {
          expect(response).toEqual(mockTypesResponse);
          expect(response.Results.length).toBe(2);
          expect(response.Results[0].VehicleTypeName).toBe('Passenger Car');
          done();
        },
        error: () => {
          fail('Expected success, but got error');
        }
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(expectedUrl);
      
      req.flush(mockTypesResponse);
    });
  });
});