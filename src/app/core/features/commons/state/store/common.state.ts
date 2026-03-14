import { withState } from '@ngrx/signals';
import { VehicleBrand } from '../../models/commons.models';

export interface CommonState {
  brands: VehicleBrand[];
  loading: boolean;
}

export const initialCommonState: CommonState = {
  brands: [],
  loading: false
};

export const CommonStateStore = withState<CommonState>(initialCommonState)
