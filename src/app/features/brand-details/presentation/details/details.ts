import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Spinner } from '../../../../shared/spinner/spinner';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';
import {MatChipsModule} from '@angular/material/chips';
import { BrandDetailsFacade } from '../../state/facade/brand-details.facade';
import { BrandCard } from '../../../../shared/brand-card/brand-card';
@Component({
  selector: 'app-details',
  imports: [MatIcon, Spinner, MatChipsModule, MatIconModule, BrandCard],
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Details {

  public readonly vehicleTypes: Signal<VehicleTypeData[]>;
  public readonly models: Signal<VehicleModelData[]>;
  public readonly brandName: Signal<string>;
  public readonly isLoadingBrandDetails: Signal<boolean>;
  public readonly totalVehiclesTypes: Signal<number>;
  public readonly totalModels: Signal<number>;

  private readonly brandDetailsFacade = inject(BrandDetailsFacade);


  constructor() {
    this.vehicleTypes = this.brandDetailsFacade.vehicleTypes;
    this.models = this.brandDetailsFacade.models;
    this.brandName = this.brandDetailsFacade.brandName;
    this.isLoadingBrandDetails = this.brandDetailsFacade.isLoadingBrandDetails;
    this.totalVehiclesTypes = this.brandDetailsFacade.totalVehicleTypes;
    this.totalModels = this.brandDetailsFacade.totalModels;
  }
}
