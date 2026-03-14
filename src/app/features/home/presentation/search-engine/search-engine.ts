import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HomeFacade } from '../../state/facade/home.facade';
import { HomeStore } from '../../state/store/home.store';
import { SortOrder } from '../../domain/models/home.models';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';
@Component({
  selector: 'app-search-engine',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule],
  templateUrl: './search-engine.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchEngine {

  public searchTerm: Signal<string>;
  public brands: Signal<VehicleBrand[]>;
  public orderedBrand: Signal<SortOrder>;
  public filteredResultsCount: Signal<number>;

  private readonly homefacade = inject(HomeFacade);

  constructor() {
    this.brands = this.homefacade.filterBrandsData;
    this.orderedBrand = this.homefacade.orderedBrands
    this.searchTerm = this.homefacade.searchTerm;
    this.filteredResultsCount = this.homefacade.filteredResultsCount;
  }

  public onSearchChange(value: string):void {
    this.homefacade.searchBrands(value);
  }

  public changeSortOrder(order: SortOrder):void {
    this.homefacade.changeSortOrder(order);
  }
}
