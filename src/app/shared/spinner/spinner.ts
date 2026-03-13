import { Component, inject } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonFacade } from '../../core/features/commons/state/facade/common.facade';
@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.html'
})
export class Spinner {
  private readonly commonFacade = inject(CommonFacade);

  protected readonly isLoading = this.commonFacade.isLoading;
}
