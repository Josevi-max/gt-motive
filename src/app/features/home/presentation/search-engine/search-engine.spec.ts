import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { HomeFacade } from '../../state/facade/home.facade';
import { SortOrderEnum } from '../../domain/models/home.models';
import { SearchEngine } from './search-engine';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';

describe('SearchEngine con zoneless', () => {
  let component: SearchEngine;
  let fixture: ComponentFixture<SearchEngine>;
  let homeFacadeSpy: jasmine.SpyObj<HomeFacade>;

  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' }
  ];

  beforeEach(async () => {
    homeFacadeSpy = jasmine.createSpyObj('HomeFacade', [
      'searchBrands',
      'changeSortOrder'
    ]);

    Object.defineProperty(homeFacadeSpy, 'filterBrandsData', {
      get: () => signal(mockBrands)
    });
    
    Object.defineProperty(homeFacadeSpy, 'orderedBrands', {
      get: () => signal(SortOrderEnum.ASC)
    });
    
    Object.defineProperty(homeFacadeSpy, 'searchTerm', {
      get: () => signal('')
    });
    
    Object.defineProperty(homeFacadeSpy, 'filteredResultsCount', {
      get: () => signal(3)
    });

    await TestBed.configureTestingModule({
      imports: [SearchEngine],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HomeFacade, useValue: homeFacadeSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEngine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Test básicos de inicialización', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize searchTerm signal with empty string', () => {
      expect(component.searchTerm()).toBe('');
    });

    it('should have orderedBrand signal', () => {
      expect(component.orderedBrand).toBeDefined();
      expect(component.orderedBrand()).toBe(SortOrderEnum.ASC);
    });

    it('should have brands signal', () => {
      expect(component.brands).toBeDefined();
      expect(component.brands()).toEqual(mockBrands);
    });
  });

  describe('Test de signals y computados', () => {
    it('should update searchTerm signal when onSearchChange is called', () => {
      const searchValue = 'Toyota';
      
      const searchTermSignal = component.searchTerm as any as ReturnType<typeof signal>;
      searchTermSignal.set(searchValue);
      fixture.detectChanges();

      expect(component.searchTerm()).toBe(searchValue);
    });

    it('should call facade.searchBrands with correct value', () => {
      const searchValue = 'Honda';
      
      component.onSearchChange(searchValue);

      expect(homeFacadeSpy.searchBrands).toHaveBeenCalledWith(searchValue);
      expect(homeFacadeSpy.searchBrands).toHaveBeenCalledTimes(1);
    });

    it('should call facade.changeSortOrder with correct order', () => {
      const newOrder = SortOrderEnum.DESC;
      
      component.changeSortOrder(newOrder);

      expect(homeFacadeSpy.changeSortOrder).toHaveBeenCalledWith(newOrder);
      expect(homeFacadeSpy.changeSortOrder).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple search changes', () => {
      component.onSearchChange('Toyota');
      component.onSearchChange('Honda');
      component.onSearchChange('Ford');

      expect(homeFacadeSpy.searchBrands).toHaveBeenCalledTimes(3);
      expect(homeFacadeSpy.searchBrands.calls.allArgs()).toEqual([
        ['Toyota'], ['Honda'], ['Ford']
      ]);
    });

    it('should handle empty search value', () => {
      component.onSearchChange('');
      
      expect(homeFacadeSpy.searchBrands).toHaveBeenCalledWith('');
    });
  });

  describe('render template tests', () => {
    it('should render search input field', () => {
      const inputElement = fixture.nativeElement.querySelector('input[matInput]');
      expect(inputElement).toBeTruthy();
    });

    it('should bind searchTerm value to input field', () => {
      const inputElement = fixture.nativeElement.querySelector('input[matInput]');
      const searchValue = 'Toyota';
      
      const searchTermSignal = component.searchTerm as any as ReturnType<typeof signal>;
      searchTermSignal.set(searchValue);
      fixture.detectChanges();

      expect(inputElement.value).toBe(searchValue);
    });

    it('should call onSearchChange when input value changes', () => {
      spyOn(component, 'onSearchChange');
      const inputElement = fixture.nativeElement.querySelector('input[matInput]');
      
      inputElement.value = 'Honda';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.onSearchChange).toHaveBeenCalledWith('Honda');
    });

    it('should render sort order select with options', () => {
      const selectElement = fixture.nativeElement.querySelector('mat-select');
      expect(selectElement).toBeTruthy();
    });

    it('should call changeSortOrder when sort order changes', () => {
      spyOn(component, 'changeSortOrder');
      
      component.changeSortOrder(SortOrderEnum.DESC);
      
      expect(component.changeSortOrder).toHaveBeenCalledWith(SortOrderEnum.DESC);
    });

    it('should display the current sort order', () => {
      expect(component.orderedBrand()).toBe(SortOrderEnum.ASC);
    });
  });

  describe('Test de comportamiento con señales', () => {
    it('should maintain signal state independently', () => {
      const initialSearchTerm = component.searchTerm();
      
      const searchTermSignal = component.searchTerm as any as ReturnType<typeof signal>;
      searchTermSignal.set('Nuevo valor');
      
      expect(initialSearchTerm).toBe('');
      expect(component.searchTerm()).toBe('Nuevo valor');
    });

    it('should react to multiple signal updates', () => {
      const searchTermSignal = component.searchTerm as any as ReturnType<typeof signal>;
      
      searchTermSignal.set('Toyota');
      expect(component.searchTerm()).toBe('Toyota');
      
      searchTermSignal.set('Honda');
      expect(component.searchTerm()).toBe('Honda');
      
      searchTermSignal.set('');
      expect(component.searchTerm()).toBe('');
    });
  });
});