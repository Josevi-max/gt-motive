import { TestBed } from '@angular/core/testing';
import { CommonFacade } from './common.facade';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { CommonStore } from '../store/common.store';
import { CommonApi } from '../../infrastructure/api/common.api';
import { GetAllMakesResponse } from '../../infrastructure/models/common.dto';
import { of } from 'rxjs';
import { VehicleBrand } from '../../models/commons.models';

describe('CommonFacade', () => {
  let service: CommonFacade;
  let commonStoreMock: any;
  let commonApiMock: jasmine.SpyObj<CommonApi>;

  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' }
  ];

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

  beforeEach(() => {
    // Mock del CommonStore
    commonStoreMock = {
      brands: signal<VehicleBrand[]>([]),
      loading: signal<boolean>(false),
      setBrands: jasmine.createSpy('setBrands'),
      setLoading: jasmine.createSpy('setLoading')
    };

    commonApiMock = jasmine.createSpyObj('CommonApi', ['getAllMakes']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        { provide: CommonStore, useValue: commonStoreMock },
        { provide: CommonApi, useValue: commonApiMock }
      ]
    });
    
    service = TestBed.inject(CommonFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test de señales', () => {
    it('should return brands signal from store', () => {
      commonStoreMock.brands.set(mockBrands);
      
      expect(service.brands()).toEqual(mockBrands);
    });

    it('should return isLoading signal from store', () => {
      expect(service.isLoading()).toBeFalse();
      
      commonStoreMock.loading.set(true);
      expect(service.isLoading()).toBeTrue();
    });
  });

  describe('Test de Loading setter', () => {
    it('should set loading state using setter', () => {
      service.Loading = true;
      expect(commonStoreMock.setLoading).toHaveBeenCalledWith(true);
      
      service.Loading = false;
      expect(commonStoreMock.setLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('Test de loadAllBrands', () => {
    it('should return cached brands if available without calling API', (done) => {
      commonStoreMock.brands.set(mockBrands);
      
      service.loadAllBrands().subscribe((brands) => {
        expect(brands).toEqual(mockBrands);
        expect(commonApiMock.getAllMakes).not.toHaveBeenCalled();
        expect(commonStoreMock.setLoading).not.toHaveBeenCalled();
        done();
      });
    });

    it('should fetch brands from API when cache is empty', (done) => {
      commonApiMock.getAllMakes.and.returnValue(of(mockApiResponse));
      
      service.loadAllBrands().subscribe((brands) => {
        expect(commonApiMock.getAllMakes).toHaveBeenCalledTimes(1);
        
        expect(commonStoreMock.setLoading).toHaveBeenCalledWith(true);
        expect(commonStoreMock.setLoading).toHaveBeenCalledWith(false);
        
        expect(commonStoreMock.setBrands).toHaveBeenCalledWith(mockBrands);
        
        expect(brands).toEqual(mockBrands);
        done();
      });
    });

    it('should transform API response correctly', (done) => {
      const apiResponse: GetAllMakesResponse = {
        Count: 2,
        Message: 'Response returned successfully',
        SearchCriteria: null,
        Results: [
          { Make_ID: 10, Make_Name: 'Mazda' },
          { Make_ID: 20, Make_Name: 'Nissan' }
        ]
      };
      
      const expectedBrands: VehicleBrand[] = [
        { id: 10, name: 'Mazda' },
        { id: 20, name: 'Nissan' }
      ];

      commonApiMock.getAllMakes.and.returnValue(of(apiResponse));
      
      service.loadAllBrands().subscribe((brands) => {
        expect(brands).toEqual(expectedBrands);
        expect(commonStoreMock.setBrands).toHaveBeenCalledWith(expectedBrands);
        done();
      });
    });
  });
});