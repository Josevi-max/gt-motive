import { withState } from '@ngrx/signals';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';

export interface BrandDetailsState {
  vehicleTypes: VehicleTypeData[];
  models: VehicleModelData[];
  loading: boolean;
  lastLoadedBrandId: number | undefined;
}

export const initialBrandDetailsState: BrandDetailsState = {
  vehicleTypes: [],
  models: [],
  loading: false,
  lastLoadedBrandId: undefined
};

export const BrandDetailsStateStore = withState<BrandDetailsState>(initialBrandDetailsState)
