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

  public searchEngine: WritableSignal<string> = signal('');

  private readonly homefacade = inject(HomeFacade);
  private readonly homeStore = inject(HomeStore);

  public get orderedBrand(): Signal<SortOrder> {
    return computed(() => this.homeStore.orderedBrands());
  }

  public get brands(): Signal<VehicleBrand[]> {
    return computed(() => this.homeStore.filteredBrands());
  }

  public onSearchChange(value: string):void {
    this.searchEngine.set(value);
    this.homefacade.filterBrands(value);
  }

  public changeSortOrder(order: SortOrder):void {
    this.homefacade.changeSortOrder(order);
  }
}
