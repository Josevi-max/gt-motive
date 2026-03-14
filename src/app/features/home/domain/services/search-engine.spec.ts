import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { SearchEngine } from './search-engine';
import { SortOrderEnum } from '../models/home.models';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';

describe('SearchEngine', () => {
  let service: SearchEngine;

  const mockBrands: VehicleBrand[] = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' },
    { id: 4, name: 'BMW' },
    { id: 5, name: 'Audi' },
    { id: 6, name: 'Mercedes' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(SearchEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sortBrands', () => {
    it('should sort brands in ascending order by default', () => {
      const unsortedBrands = [
        { id: 3, name: 'Ford' },
        { id: 2, name: 'Honda' },
        { id: 1, name: 'Toyota' },
        { id: 5, name: 'Audi' }
      ];

      const sorted = service.sortBrands(unsortedBrands);
      
      expect(sorted[0].name).toBe('Audi');
      expect(sorted[1].name).toBe('Ford');
      expect(sorted[2].name).toBe('Honda');
      expect(sorted[3].name).toBe('Toyota');
    });

    it('should sort brands in ascending order when explicitly specified', () => {
      const unsortedBrands = [
        { id: 3, name: 'Ford' },
        { id: 2, name: 'Honda' },
        { id: 1, name: 'Toyota' }
      ];

      const sorted = service.sortBrands(unsortedBrands, SortOrderEnum.ASC);
      
      expect(sorted[0].name).toBe('Ford');
      expect(sorted[1].name).toBe('Honda');
      expect(sorted[2].name).toBe('Toyota');
    });

    it('should sort brands in descending order when specified', () => {
      const unsortedBrands = [
        { id: 3, name: 'Ford' },
        { id: 2, name: 'Honda' },
        { id: 1, name: 'Toyota' }
      ];

      const sorted = service.sortBrands(unsortedBrands, SortOrderEnum.DESC);
      
      expect(sorted[0].name).toBe('Toyota');
      expect(sorted[1].name).toBe('Honda');
      expect(sorted[2].name).toBe('Ford');
    });

    it('should not mutate the original array', () => {
      const originalBrands = [...mockBrands];
      const originalBrandsCopy = [...originalBrands];
      
      service.sortBrands(originalBrands, SortOrderEnum.ASC);
      
      expect(originalBrands).toEqual(originalBrandsCopy);
    });

    it('should handle empty array', () => {
      const emptyBrands: VehicleBrand[] = [];
      const sorted = service.sortBrands(emptyBrands);
      
      expect(sorted).toEqual([]);
    });

    it('should handle array with one element', () => {
      const singleBrand = [{ id: 1, name: 'Toyota' }];
      const sorted = service.sortBrands(singleBrand);
      
      expect(sorted).toEqual(singleBrand);
    });

    it('should be case insensitive when sorting', () => {
      const brandsWithDifferentCase = [
        { id: 1, name: 'toyota' },
        { id: 2, name: 'AUDI' },
        { id: 3, name: 'Bmw' },
        { id: 4, name: 'honda' }
      ];

      const sorted = service.sortBrands(brandsWithDifferentCase, SortOrderEnum.ASC);
      
      expect(sorted[0].name).toBe('AUDI');
      expect(sorted[1].name).toBe('Bmw');
      expect(sorted[2].name).toBe('honda');
      expect(sorted[3].name).toBe('toyota');
    });
  });

  describe('filterBrands', () => {
    it('should filter brands by search term (case insensitive)', () => {
      const filtered = service.filterBrands('o', mockBrands);
      
      expect(filtered.length).toBe(3);
      expect(filtered.map(b => b.name)).toContain('Toyota');
      expect(filtered.map(b => b.name)).toContain('Honda');
      expect(filtered.map(b => b.name)).toContain('Ford');
    });

    it('should return empty array when no brands match search term', () => {
      const filtered = service.filterBrands('xyz', mockBrands);
      
      expect(filtered).toEqual([]);
    });

    it('should handle empty search term - return all brands sorted', () => {
      const filtered = service.filterBrands('', mockBrands);
      
      expect(filtered.length).toBe(mockBrands.length);
      expect(filtered[0].name).toBe('Audi');
    });

    it('should handle empty brands array', () => {
      const filtered = service.filterBrands('toyota', []);
      
      expect(filtered).toEqual([]);
    });

    it('should be case insensitive in filtering', () => {
      const mixedCaseBrands = [
        { id: 1, name: 'TOYOTA' },
        { id: 2, name: 'honda' },
        { id: 3, name: 'Bmw' }
      ];

      const filtered = service.filterBrands('to', mixedCaseBrands);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('TOYOTA');
    });

    it('should preserve original array when filtering', () => {
      const originalBrands = [...mockBrands];
      const originalBrandsCopy = [...originalBrands];
      
      service.filterBrands('a', originalBrands);
      
      expect(originalBrands).toEqual(originalBrandsCopy);
    });
  });
});