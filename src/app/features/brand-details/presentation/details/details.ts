import { Component, computed, inject, Signal } from '@angular/core';
import { BrandDetailsStore } from '../../state/store/brand-details.store';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';
import { JsonPipe } from '@angular/common';
import { Spinner } from '../../../../shared/spinner/spinner';

@Component({
  selector: 'app-details',
  imports: [JsonPipe, Spinner],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  private readonly brandDetailsStore = inject(BrandDetailsStore);

  public get vehicleTypes(): Signal<VehicleTypeData[]> {
    return computed(() => this.brandDetailsStore.vehicleTypes());
  }

  public get models(): Signal<VehicleModelData[]> {
    return computed(() => this.brandDetailsStore.models());
  }

  public get isLoading(): Signal<boolean> {
    return computed(() => this.brandDetailsStore.loading());
  }

}
