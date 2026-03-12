import { inject, Injectable } from '@angular/core';
import { HomeStore } from '../../state/store/home.store';
import { SortOrder, VehicleBrand } from '../models/home.models';

@Injectable({
  providedIn: 'root',
})
export class SearchEngine {

  private readonly homeMethodsStore = inject(HomeStore);

  public filterBrands(searchTerm: string): VehicleBrand[] {
    const allBrands = this.homeMethodsStore.brands();
    const sortOption = this.homeMethodsStore.orderedBrands();
    const filteredBrands = allBrands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedBrands = this.sortBrands(filteredBrands, sortOption);
    return sortedBrands;
  }

  public sortBrands(brands: VehicleBrand[],order: SortOrder = 'asc', ): VehicleBrand[] {
    const newBrands = [...brands];
    return newBrands.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return order === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
