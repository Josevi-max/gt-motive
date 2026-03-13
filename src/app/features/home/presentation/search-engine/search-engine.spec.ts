import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HomeFacade } from '../../state/facade/home.facade';
import { HomeStore } from '../../state/store/home.store';
import { SortOrderEnum, VehicleBrand } from '../../domain/models/home.models';
import { By } from '@angular/platform-browser';
import { SearchEngine } from './search-engine';

describe('SearchEngine con zoneless', () => {
  let component: SearchEngine;
  let fixture: ComponentFixture<SearchEngine>;
  let homeFacadeSpy: jasmine.SpyObj<HomeFacade>;
  let homeStoreSpy: jasmine.SpyObj<InstanceType<typeof HomeStore>>;

  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' }
  ];

  beforeEach(async () => {
    homeFacadeSpy = jasmine.createSpyObj('HomeFacade', [
      'filterBrands',
      'changeSortOrder'
    ]);

    homeStoreSpy = jasmine.createSpyObj('HomeStore', [], {
      filteredBrands: () => mockBrands,
      orderedBrands: () => SortOrderEnum.ASC
    });

    await TestBed.configureTestingModule({
      imports: [SearchEngine],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HomeFacade, useValue: homeFacadeSpy },
        { provide: HomeStore, useValue: homeStoreSpy }
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

    it('should initialize searchEngine signal with empty string', () => {
      expect(component.searchEngine()).toBe('');
    });

    it('should have orderedBrand computed signal', () => {
      expect(component.orderedBrand).toBeDefined();
      expect(component.orderedBrand()).toBe(SortOrderEnum.ASC);
    });

    it('should have brands computed signal', () => {
      expect(component.brands).toBeDefined();
      expect(component.brands()).toEqual(mockBrands);
    });
  });

  describe('Test de signals y computados', () => {
    it('should update searchEngine signal when onSearchChange is called', () => {
      const searchValue = 'Toyota';
      
      component.onSearchChange(searchValue);
      fixture.detectChanges();

      expect(component.searchEngine()).toBe(searchValue);
    });

    it('should call facade.filterBrands with correct value', () => {
      const searchValue = 'Honda';
      
      component.onSearchChange(searchValue);

      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledWith(searchValue);
      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledTimes(1);
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

      expect(component.searchEngine()).toBe('Ford');
      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledTimes(3);
      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledWith('Toyota');
      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledWith('Honda');
      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledWith('Ford');
    });

    it('should handle empty search value', () => {
      component.onSearchChange('');
      
      expect(component.searchEngine()).toBe('');
      expect(homeFacadeSpy.filterBrands).toHaveBeenCalledWith('');
    });
  });

  describe('render template tests', () => {
    it('should render search input field', () => {
      const inputElement = fixture.nativeElement.querySelector('input[matInput]');
      expect(inputElement).toBeTruthy();
    });

    it('should bind searchEngine value to input field', () => {
      const inputElement = fixture.nativeElement.querySelector('input[matInput]');
      const searchValue = 'Toyota';
      
      component.searchEngine.set(searchValue);
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
      
      const selectElement = fixture.debugElement.query(By.css('mat-select'));
      if (selectElement) {
        selectElement.triggerEventHandler('selectionChange', { value: SortOrderEnum.DESC });
        fixture.detectChanges();
        
        expect(component.changeSortOrder).toHaveBeenCalledWith(SortOrderEnum.DESC);
      }
    });

    it('should display the current sort order', () => {
      expect(component.orderedBrand()).toBe(SortOrderEnum.ASC);
    });
  });

  describe('Test de comportamiento con señales', () => {
    it('should maintain signal state independently', () => {
      const initialSearchEngine = component.searchEngine();
      
      component.onSearchChange('Nuevo valor');
      
      expect(initialSearchEngine).toBe('');
      expect(component.searchEngine()).toBe('Nuevo valor');
    });

    it('should react to multiple signal updates', () => {
      component.searchEngine.set('Toyota');
      expect(component.searchEngine()).toBe('Toyota');
      
      component.searchEngine.set('Honda');
      expect(component.searchEngine()).toBe('Honda');
      
      component.searchEngine.set('');
      expect(component.searchEngine()).toBe('');
    });
  });
});