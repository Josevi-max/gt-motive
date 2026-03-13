import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Home } from './home';
import { VehicleBrand } from '../../domain/models/home.models';
import { HomeStore } from '../../state/store/home.store';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let homeStoreMock: {
    filteredBrands: () => VehicleBrand[];
    loading: () => boolean;
  };
  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' }
  ];
  beforeEach(async () => {
    homeStoreMock = {
      filteredBrands: () => mockBrands,
      loading: () => false
    };
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideZonelessChangeDetection(), { provide: HomeStore, useValue: homeStoreMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return brands signal from store', () => {
    const brandsSignal = component.brands;
    expect(brandsSignal).toBeDefined();
    expect(brandsSignal()).toEqual(mockBrands);
  });

  it('should return isLoading signal from store', () => {
    const isLoadingSignal = component.isLoading;
    expect(isLoadingSignal).toBeDefined();
    expect(isLoadingSignal()).toBeFalse();
  });
});