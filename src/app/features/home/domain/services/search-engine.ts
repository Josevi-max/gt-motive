import { inject, Injectable } from '@angular/core';
import { HomeStore } from '../../state/store/home.store';
import { SortOrder, SortOrderEnum } from '../models/home.models';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';
import { HomeFacade } from '../../state/facade/home.facade';

@Injectable({
  providedIn: 'root',
})
export class SearchEngine {

  public filterBrands(searchTerm: string, allBrands: VehicleBrand[], sortOption: SortOrder = SortOrderEnum.ASC): VehicleBrand[] {
    const filteredBrands = allBrands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedBrands = this.sortBrands(filteredBrands, sortOption);
    return sortedBrands;
  }

  public sortBrands(brands: VehicleBrand[],order: SortOrder = SortOrderEnum.ASC, ): VehicleBrand[] {
    const newBrands = [...brands];
    return newBrands.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return order === SortOrderEnum.ASC ? -1 : 1;
      }
      if (nameA > nameB) {
        return order === SortOrderEnum.ASC ? 1 : -1;
      }
      return 0;
    });
  }
}
