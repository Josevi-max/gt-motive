import { Component, inject } from '@angular/core';
import { BrandDetailsStore } from '../../state/store/brand-details.store';
import { Spinner } from '../../../../shared/spinner/spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  imports: [Spinner, MatIcon],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  private readonly brandDetailsStore = inject(BrandDetailsStore);

  protected readonly vehicleTypes = this.brandDetailsStore.vehicleTypes;
  protected readonly models = this.brandDetailsStore.models;
  protected readonly brandName = this.brandDetailsStore.brandName;
}
