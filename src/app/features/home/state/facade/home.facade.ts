import { inject, Injectable } from '@angular/core';
import { SortOrder } from '../../domain/models/home.models';
import { HomeStore } from '../store/home.store';
import { SearchEngine } from '../../domain/services/search-engine';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {

  private readonly homeMethodsStore = inject(HomeStore);
  private readonly searchEngine = inject(SearchEngine);
  private readonly commonFacade = inject(CommonFacade);

  public readonly filterBrandsData = this.homeMethodsStore.filteredBrands;
  public readonly orderedBrands = this.homeMethodsStore.orderedBrands;

  public initFilterBrands(): void {
    const brands = this.commonFacade.brands();
    const sortedBrands = this.searchEngine.sortBrands(brands);
    this.homeMethodsStore.setFilteredBrands(sortedBrands);
  }

  public filterBrands(searchTerm: string): void {
    const filteredBrands = this.searchEngine.filterBrands(searchTerm, this.commonFacade.brands());
    this.homeMethodsStore.setFilteredBrands(filteredBrands);
  }
  
  public changeSortOrder(order: SortOrder): void {
    this.homeMethodsStore.setOrderedBrands(order);
    const filteredBrands = this.homeMethodsStore.filteredBrands();
    const sortedBrands = this.searchEngine.sortBrands(filteredBrands, order);
    this.homeMethodsStore.setFilteredBrands(sortedBrands);
  }
}
