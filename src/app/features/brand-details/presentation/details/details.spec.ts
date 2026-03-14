import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { Details } from './details';
import { BrandDetailsFacade } from '../../state/facade/brand-details.facade';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';

describe('Details', () => {
  let component: Details;
  let fixture: ComponentFixture<Details>;
  let brandDetailsFacadeMock: any;

  const mockVehicleTypes: VehicleTypeData[] = [
    { id: 1, name: 'SUV' },
    { id: 2, name: 'Sedan' },
    { id: 3, name: 'Hatchback' }
  ];

  const mockModels: VehicleModelData[] = [
    { idModel: 1, nameModel: 'Corolla', idMake: 123, nameMake: 'Toyota' },
    { idModel: 2, nameModel: 'Camry', idMake: 123, nameMake: 'Toyota' },
    { idModel: 3, nameModel: 'RAV4', idMake: 123, nameMake: 'Toyota' },
    { idModel: 4, nameModel: 'Highlander', idMake: 123, nameMake: 'Toyota' }
  ];

  beforeEach(async () => {
    brandDetailsFacadeMock = {
      vehicleTypes: signal<VehicleTypeData[]>(mockVehicleTypes),
      modelsLoaded: signal<VehicleModelData[]>(mockModels),
      brandName: signal<string>('Toyota'),
      isLoadingBrandDetails: signal<boolean>(false),
      totalVehicleTypes: signal<number>(3),
      totalModels: signal<number>(4),
      disabledLoadMoreModelsButtons: signal<boolean>(false),
      loadMoreModels: jasmine.createSpy('loadMoreModels')
    };

    await TestBed.configureTestingModule({
      imports: [Details],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        { provide: BrandDetailsFacade, useValue: brandDetailsFacadeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Details);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signal initialization', () => {
    it('should initialize vehicleTypes signal from facade', () => {
      expect(component.vehicleTypes()).toEqual(mockVehicleTypes);
    });

    it('should initialize modelsLoaded signal from facade', () => {
      expect(component.modelsLoaded()).toEqual(mockModels);
    });

    it('should initialize brandName signal from facade', () => {
      expect(component.brandName()).toBe('Toyota');
    });

    it('should initialize isLoadingBrandDetails signal from facade', () => {
      expect(component.isLoadingBrandDetails()).toBeFalse();
    });

    it('should initialize totalVehiclesTypes signal from facade', () => {
      expect(component.totalVehiclesTypes()).toBe(3);
    });

    it('should initialize totalModels signal from facade', () => {
      expect(component.totalModels()).toBe(4);
    });

    it('should initialize disabledLoadMore signal from facade', () => {
      expect(component.disabledLoadMore()).toBeFalse();
    });
  });

  describe('calculateGridColumns', () => {
    it('should return 3 when totalModels is greater than or equal to 3', () => {
      brandDetailsFacadeMock.totalModels.set(5);
      fixture.detectChanges();
      
      const result = (component as any).calculateGridColumns();
      expect(result).toBe(3);
    });

    it('should return 1 when totalModels is 1', () => {
      brandDetailsFacadeMock.totalModels.set(1);
      fixture.detectChanges();
      
      const result = (component as any).calculateGridColumns();
      expect(result).toBe(1);
    });
  });

  describe('getGridClasses', () => {
    it('should return correct grid classes string', () => {
      brandDetailsFacadeMock.totalModels.set(4);
      fixture.detectChanges();
      
      const result = component.getGridClasses();
      expect(result).toBe('grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 overflow-y-auto overflow-x-hidden h-[400px]');
    });
  });

  describe('loadMore', () => {
    it('should call facade loadMoreModels', () => {
      component.loadMore();
      expect(brandDetailsFacadeMock.loadMoreModels).toHaveBeenCalled();
    });
  });
})