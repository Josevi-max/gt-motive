import { inject, Injectable, Signal } from '@angular/core';
import { SortOrder } from '../../domain/models/home.models';
import { HomeStore } from '../store/home.store';
import { SearchEngine } from '../../domain/services/search-engine';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {

  public readonly filterBrandsData: Signal<VehicleBrand[]>;
  public readonly orderedBrands: Signal<SortOrder>;
  public readonly searchTerm: Signal<string>;
  public readonly filteredResultsCount: Signal<number>;

  private readonly homeMethodsStore = inject(HomeStore);
  private readonly searchEngine = inject(SearchEngine);
  private readonly commonFacade = inject(CommonFacade);

  constructor() {
    this.filterBrandsData = this.homeMethodsStore.filteredBrands;
    this.orderedBrands = this.homeMethodsStore.orderedBrands;
    this.searchTerm = this.homeMethodsStore.searchTerm;
    this.filteredResultsCount = this.homeMethodsStore.filteredResultsCount;
  }

  public initFilterBrands(): void {
    const brands = this.commonFacade.brands();
    const sortedBrands = this.searchEngine.sortBrands(brands);
  }

  public searchBrands(searchTerm: string): void {
    this.homeMethodsStore.setSearchTerm(searchTerm);
  }
  
  public changeSortOrder(order: SortOrder): void {
    this.homeMethodsStore.setOrderedBrands(order);
  }
}
