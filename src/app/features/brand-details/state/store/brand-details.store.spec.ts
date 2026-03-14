import { TestBed } from '@angular/core/testing';
import { BrandDetailsStore } from './brand-details.store';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BrandDetailsStore', () => {
  let store: InstanceType<typeof BrandDetailsStore>;

  const mockVehicleTypes: VehicleTypeData[] = [
    { id: 1, name: 'SUV' },
    { id: 2, name: 'Sedan' }
  ];

  const mockModels: VehicleModelData[] = [
    { idModel: 1, nameModel: 'Corolla', idMake: 123, nameMake: 'Toyota' },
    { idModel: 2, nameModel: 'Camry', idMake: 123, nameMake: 'Toyota' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection()]
    });
    store = TestBed.inject(BrandDetailsStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have initial vehicleTypes as empty array', () => {
      expect(store.vehicleTypes()).toEqual([]);
    });

    it('should have initial models as empty array', () => {
      expect(store.models()).toEqual([]);
    });

    it('should have initial modelsLoaded as empty array', () => {
      expect(store.modelsLoaded()).toEqual([]);
    });

    it('should have initial loading as false', () => {
      expect(store.loading()).toBeFalse();
    });

    it('should have initial lastLoadedBrandId as undefined', () => {
      expect(store.lastLoadedBrandId()).toBeUndefined();
    });

    it('should have initial brandName as empty string', () => {
      expect(store.brandName()).toBe('');
    });
  });

  describe('computed signals', () => {
    it('should compute totalVehicleTypes', () => {
      store.setVehicleTypes(mockVehicleTypes);
      expect(store.totalVehicleTypes()).toBe(2);
    });

    it('should compute totalModels', () => {
      store.setModels(mockModels);
      expect(store.totalModels()).toBe(2);
    });

    it('should compute disabledLoadMoreModelsButtons as true when all models loaded', () => {
      store.setModels(mockModels);
      store.setModelsLoaded(mockModels);
      expect(store.disabledLoadMoreModelsButtons()).toBeTrue();
    });

    it('should compute disabledLoadMoreModelsButtons as false when not all models loaded', () => {
      store.setModels(mockModels);
      store.setModelsLoaded([mockModels[0]]);
      expect(store.disabledLoadMoreModelsButtons()).toBeFalse();
    });
  });

  describe('methods', () => {
    it('should set vehicle types', () => {
      store.setVehicleTypes(mockVehicleTypes);
      expect(store.vehicleTypes()).toEqual(mockVehicleTypes);
    });

    it('should set models', () => {
      store.setModels(mockModels);
      expect(store.models()).toEqual(mockModels);
    });

    it('should set models loaded', () => {
      store.setModelsLoaded(mockModels);
      expect(store.modelsLoaded()).toEqual(mockModels);
    });

    it('should set loading', () => {
      store.setLoading(true);
      expect(store.loading()).toBeTrue();
    });

    it('should set last loaded brand id', () => {
      store.setLastLoadedBrandId(123);
      expect(store.lastLoadedBrandId()).toBe(123);
    });

    it('should set brand name', () => {
      store.setBrandName('Toyota');
      expect(store.brandName()).toBe('Toyota');
    });

    it('should reset state', () => {
      store.setVehicleTypes(mockVehicleTypes);
      store.setModels(mockModels);
      store.setLoading(true);
      store.setBrandName('Toyota');

      store.resetState();

      expect(store.vehicleTypes()).toEqual([]);
      expect(store.models()).toEqual([]);
      expect(store.loading()).toBeFalse();
      expect(store.brandName()).toBe('');
    });

    it('should update models loaded', () => {
      const initialModels = [mockModels[0]];
      const newModels = [mockModels[1]];

      store.setModelsLoaded(initialModels);
      store.updateModelsLoaded(newModels);

      expect(store.modelsLoaded()).toEqual([...initialModels, ...newModels]);
    });
  });
});