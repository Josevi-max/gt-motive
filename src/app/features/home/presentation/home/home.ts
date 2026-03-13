import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrandCard } from '../brand-card/brand-card';
import { SearchEngine } from "../search-engine/search-engine";
import { Spinner } from '../../../../shared/spinner/spinner';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';
import { HomeFacade } from '../../state/facade/home.facade';
import { CommonFacade } from '../../../../core/features/commons/state/facade/common.facade';
@Component({
  selector: 'app-home',
  imports: [ScrollingModule, BrandCard, SearchEngine, Spinner],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Home {

  private readonly homeFacade = inject(HomeFacade);
  private readonly commonFacade = inject(CommonFacade);

  protected readonly brands = this.homeFacade.filterBrandsData;
  protected readonly isLoading = this.commonFacade.isLoading;

}
