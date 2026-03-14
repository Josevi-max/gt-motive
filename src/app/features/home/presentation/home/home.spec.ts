import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Home } from './home';
import { HomeStore } from '../../state/store/home.store';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';
import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let homeStoreMock: any;

  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' }
  ];

  beforeEach(async () => {
    homeStoreMock = {
      filteredBrands: signal(mockBrands),
      filteredResultsCount: signal(3),
      orderedBrands: signal('asc' as const),
      searchTerm: signal(''),
      
      // Métodos del store
      setSearchTerm: jasmine.createSpy('setSearchTerm'),
      setOrderedBrands: jasmine.createSpy('setOrderedBrands')
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HomeStore, useValue: homeStoreMock },
        provideHttpClient()
      ]
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
    const filteredCountSignal = component.filteredResultsCount;
    expect(filteredCountSignal).toBeDefined();
    expect(filteredCountSignal()).toBe(3);
  });
});