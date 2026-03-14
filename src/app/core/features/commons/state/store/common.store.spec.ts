import { TestBed } from '@angular/core/testing';
import { CommonStore } from './common.store';
import { VehicleBrand } from '../../models/commons.models';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CommonStore', () => {
  let store: InstanceType<typeof CommonStore>;

  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection()]
    });
    store = TestBed.inject(CommonStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have initial brands as empty array', () => {
      expect(store.brands()).toEqual([]);
    });

    it('should have initial loading as false', () => {
      expect(store.loading()).toBeFalse();
    });
  });

  describe('methods', () => {
    it('should set brands', () => {
      store.setBrands(mockBrands);
      expect(store.brands()).toEqual(mockBrands);
    });

    it('should set loading', () => {
      store.setLoading(true);
      expect(store.loading()).toBeTrue();
    });

  });
});