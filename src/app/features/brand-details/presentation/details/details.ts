import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Spinner } from '../../../../shared/spinner/spinner';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';
import { MatChipsModule } from '@angular/material/chips';
import { BrandDetailsFacade } from '../../state/facade/brand-details.facade';
import { BrandCard } from '../../../../shared/brand-card/brand-card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-details',
  imports: [MatIcon, Spinner, MatChipsModule, MatIconModule, BrandCard, MatButtonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Details {

  public readonly vehicleTypes: Signal<VehicleTypeData[]>;
  public readonly brandName: Signal<string>;
  public readonly isLoadingBrandDetails: Signal<boolean>;
  public readonly totalVehiclesTypes: Signal<number>;
  public readonly totalModels: Signal<number>;
  public readonly modelsLoaded: Signal<VehicleModelData[]>;
  public readonly disabledLoadMore: Signal<boolean>;


  private readonly brandDetailsFacade = inject(BrandDetailsFacade);

  constructor() {
    this.vehicleTypes = this.brandDetailsFacade.vehicleTypes;
    this.modelsLoaded = this.brandDetailsFacade.modelsLoaded;
    this.brandName = this.brandDetailsFacade.brandName;
    this.isLoadingBrandDetails = this.brandDetailsFacade.isLoadingBrandDetails;
    this.totalVehiclesTypes = this.brandDetailsFacade.totalVehicleTypes;
    this.totalModels = this.brandDetailsFacade.totalModels;
    this.disabledLoadMore = this.brandDetailsFacade.disabledLoadMoreModelsButtons;
  }

  public getGridClasses(): string {
    const cols = this.calculateGridColumns();
    return `grid grid-cols-1 sm:grid-cols-${cols} lg:grid-cols-${cols} xl:grid-cols-${cols} gap-6 overflow-y-auto overflow-x-hidden h-[400px]`;
  }

  public loadMore():void {
    this.brandDetailsFacade.loadMoreModels();
  }

  private calculateGridColumns(): number {
    let result: number = 3;

    if (this.totalModels() < 3) {
      result = this.totalModels();
    }

    return result
  }
}
