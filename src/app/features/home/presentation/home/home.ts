import { Component, computed, inject, Signal } from '@angular/core';
import { VehicleBrand } from '../../domain/models/home.models';
import { HomeStore } from '../../state/store/home.store';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private readonly homeStore = inject(HomeStore);

  public get brands(): Signal<VehicleBrand[]> {
    return computed(() => this.homeStore.brands());
  }


}
