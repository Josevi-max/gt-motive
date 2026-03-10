import { Component, computed, inject, Signal } from '@angular/core';
import { VehicleBrand } from '../../domain/models/home.models';
import { HomeStateStore } from '../../state/store/home.store';
import { withComputed } from '@ngrx/signals';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private readonly homeStore = inject(HomeStateStore);

  public get brands(): Signal<VehicleBrand[]> {
    return computed(() => this.homeStore.brands());
  }


}
