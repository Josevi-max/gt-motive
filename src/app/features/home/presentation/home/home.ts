import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchEngine } from "../search-engine/search-engine";
import { HomeFacade } from '../../state/facade/home.facade';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';
import { BrandCard } from '../../../../shared/brand-card/brand-card';
@Component({
  selector: 'app-home',
  imports: [ScrollingModule, BrandCard, SearchEngine],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Home {

  public filteredResultsCount: Signal<number>;
  public brands: Signal<VehicleBrand[]>;

  private readonly homeFacade = inject(HomeFacade);

  constructor() {
    this.filteredResultsCount = this.homeFacade.filteredResultsCount;
    this.brands = this.homeFacade.filterBrandsData;
  }

}
