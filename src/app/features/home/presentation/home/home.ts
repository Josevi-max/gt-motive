import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { VehicleBrand } from '../../domain/models/home.models';
import { HomeStore } from '../../state/store/home.store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrandCard } from '../brand-card/brand-card';
import { SearchEngine } from "../search-engine/search-engine";
@Component({
  selector: 'app-home',
  imports: [ScrollingModule, BrandCard, SearchEngine],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Home {

  private readonly homeStore = inject(HomeStore);

  public get brands(): Signal<VehicleBrand[]> {
    return computed(() => this.homeStore.filteredBrands());
  }


}
