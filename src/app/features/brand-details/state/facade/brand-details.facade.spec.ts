import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { BrandDetailsFacade } from './brand-details.facade';
import { BrandDetailsStore } from '../store/brand-details.store';
import { BrandDetailsApi } from '../../infrastructure/api/brand-details-api';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';
import { BrandDetailsApiResponse, TypesVehicleApiResponse } from '../../infrastructure/models/brand-details.dto';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';

describe('BrandDetailsFacade', () => {
  let service: BrandDetailsFacade;
  let brandDetailsStoreMock: any;
  let brandDetailsApiMock: jasmine.SpyObj<BrandDetailsApi>;
  let commonFacadeMock: any;

  const mockBrandId = 123;
  const mockBrandName = 'Toyota';
  
  const mockBrands: VehicleBrand[] = [
    { id: 123, name: 'Toyota' },
    { id: 456, name: 'Honda' }
  ];

  const mockApiDetailsResponse: BrandDetailsApiResponse = {
    Count: 3,
    Message: 'Response returned successfully',
    SearchCriteria: '',
    Results: [
      { Make_ID: 123, Make_Name: 'Toyota', Model_ID: 1, Model_Name: 'Corolla' },
      { Make_ID: 123, Make_Name: 'Toyota', Model_ID: 2, Model_Name: 'Camry' },
      { Make_ID: 123, Make_Name: 'Toyota', Model_ID: 3, Model_Name: 'RAV4' }
    ]
  };

  const mockApiTypesResponse: TypesVehicleApiResponse = {
    Count: 2,
    Message: 'Response returned successfully',
    SearchCriteria: '',
    Results: [
      { VehicleTypeId: 1, VehicleTypeName: 'SUV' },
      { VehicleTypeId: 2, VehicleTypeName: 'Sedan' }
    ]
  };

  beforeEach(() => {
    brandDetailsStoreMock = {
      loading: signal(false),
      totalVehicleTypes: signal(0),
      totalModels: signal(0),
      models: signal([]),
      modelsLoaded: signal([]),
      vehicleTypes: signal([]),
      brandName: signal(''),
      disabledLoadMoreModelsButtons: signal(false),
      lastLoadedBrandId: signal<number | null>(null),
      
      setLoading: jasmine.createSpy('setLoading'),
      setModels: jasmine.createSpy('setModels'),
      setVehicleTypes: jasmine.createSpy('setVehicleTypes'),
      setLastLoadedBrandId: jasmine.createSpy('setLastLoadedBrandId'),
      setModelsLoaded: jasmine.createSpy('setModelsLoaded'),
      setBrandName: jasmine.createSpy('setBrandName')
    };

    brandDetailsApiMock = jasmine.createSpyObj('BrandDetailsApi', [
      'getBrandDetails',
      'getVehicleTypesForBrand'
    ]);

    commonFacadeMock = {
      brands: signal(mockBrands)
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        { provide: BrandDetailsStore, useValue: brandDetailsStoreMock },
        { provide: BrandDetailsApi, useValue: brandDetailsApiMock },
        { provide: CommonFacade, useValue: commonFacadeMock }
      ]
    });

    service = TestBed.inject(BrandDetailsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Signal initialization', () => {
    it('should initialize signals from store', () => {
      expect(service.isLoadingBrandDetails).toBeDefined();
      expect(service.totalVehicleTypes).toBeDefined();
      expect(service.totalModels).toBeDefined();
      expect(service.models).toBeDefined();
      expect(service.vehicleTypes).toBeDefined();
      expect(service.brandName).toBeDefined();
      expect(service.modelsLoaded).toBeDefined();
      expect(service.disabledLoadMoreModelsButtons).toBeDefined();
    });
  });

  describe('loadBrandDetails', () => {
    it('should not load if same brandId is already loaded', () => {
      brandDetailsStoreMock.lastLoadedBrandId.set(mockBrandId);
      
      service.loadBrandDetails(mockBrandId);
      
      expect(brandDetailsApiMock.getBrandDetails).not.toHaveBeenCalled();
      expect(brandDetailsApiMock.getVehicleTypesForBrand).not.toHaveBeenCalled();
      expect(brandDetailsStoreMock.setLoading).not.toHaveBeenCalled();
    });

    it('should load brand details when brandId is different from last loaded', () => {
      brandDetailsApiMock.getBrandDetails.and.returnValue(of(mockApiDetailsResponse));
      brandDetailsApiMock.getVehicleTypesForBrand.and.returnValue(of(mockApiTypesResponse));

      service.loadBrandDetails(mockBrandId);

      expect(brandDetailsStoreMock.setLoading).toHaveBeenCalledWith(true);
      expect(brandDetailsApiMock.getBrandDetails).toHaveBeenCalledWith(mockBrandId);
      expect(brandDetailsApiMock.getVehicleTypesForBrand).toHaveBeenCalledWith(mockBrandId);
    });

    it('should set brand name correctly from commonFacade', (done) => {
      brandDetailsApiMock.getBrandDetails.and.returnValue(of(mockApiDetailsResponse));
      brandDetailsApiMock.getVehicleTypesForBrand.and.returnValue(of(mockApiTypesResponse));

      service.loadBrandDetails(mockBrandId);

      setTimeout(() => {
        expect(brandDetailsStoreMock.setBrandName).toHaveBeenCalledWith('Toyota');
        done();
      });
    });

    it('should set loading to false after completion', (done) => {
      brandDetailsApiMock.getBrandDetails.and.returnValue(of(mockApiDetailsResponse));
      brandDetailsApiMock.getVehicleTypesForBrand.and.returnValue(of(mockApiTypesResponse));

      service.loadBrandDetails(mockBrandId);

      setTimeout(() => {
        expect(brandDetailsStoreMock.setLoading).toHaveBeenCalledWith(false);
        done();
      });
    });
  });

  describe('loadMoreModels', () => {
    it('should load more models when called', () => {
      const allModels = [
        { idModel: 1, nameModel: 'Model 1' },
        { idModel: 2, nameModel: 'Model 2' },
        { idModel: 3, nameModel: 'Model 3' },
        { idModel: 4, nameModel: 'Model 4' },
        { idModel: 5, nameModel: 'Model 5' }
      ] as any;
      
      brandDetailsStoreMock.models.set(allModels);
      
      service.loadMoreModels();
      
      expect(brandDetailsStoreMock.setModelsLoaded).toHaveBeenCalled();
    });
  });
});