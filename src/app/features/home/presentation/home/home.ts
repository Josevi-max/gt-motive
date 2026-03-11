import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { VehicleBrand } from '../../domain/models/home.models';
import { HomeStore } from '../../state/store/home.store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrandCard } from '../brand-card/brand-card';
@Component({
  selector: 'app-home',
  imports: [ScrollingModule, BrandCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Home {

  private readonly homeStore = inject(HomeStore);

  public get brands(): Signal<VehicleBrand[]> {
    return computed(() => this.homeStore.brands());
  }


}
