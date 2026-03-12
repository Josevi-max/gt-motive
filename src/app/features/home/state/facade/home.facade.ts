import { inject, Injectable } from '@angular/core';
import { HomeApi } from '../../infrastructure/api/home.api';
import { map, tap } from 'rxjs';
import { GetAllMakesResponse } from '../../infrastructure/models/home.dto';
import { HomeMethodsStore } from '../store/home.methods';
import { SortOrder, VehicleBrand } from '../../domain/models/home.models';
import { HomeStore } from '../store/home.store';
import { SearchEngine } from '../../domain/services/search-engine';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {

  private readonly homeApiService = inject(HomeApi);
  private readonly homeMethodsStore = inject(HomeStore);
  private readonly searchEngine = inject(SearchEngine);
  public loadBrands(): void {
    this.homeMethodsStore.setLoading(true);
    this.homeApiService.getAllMakes().pipe(
      map((response: GetAllMakesResponse) => {
        return response.Results.map(result => ({
          id: result.Make_ID,
          name: result.Make_Name
        }));
      }),
      tap((brands: VehicleBrand[]) => {
        this.homeMethodsStore.setBrands(brands);
        const sortedBrands = this.searchEngine.sortBrands(brands);
        this.homeMethodsStore.setFilteredBrands(sortedBrands);
        this.homeMethodsStore.setLoading(false);
      })
    ).subscribe();
  }
  public filterBrands(searchTerm: string): void {
    const filteredBrands = this.searchEngine.filterBrands(searchTerm);
    this.homeMethodsStore.setFilteredBrands(filteredBrands);
  }
  public changeSortOrder(order: SortOrder): void {
    this.homeMethodsStore.setOrderedBrands(order);
    const filteredBrands = this.homeMethodsStore.filteredBrands();
    const sortedBrands = this.searchEngine.sortBrands(filteredBrands, order);
    this.homeMethodsStore.setFilteredBrands(sortedBrands);
  }
}
