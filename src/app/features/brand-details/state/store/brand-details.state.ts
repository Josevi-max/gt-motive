import { withState } from '@ngrx/signals';
import { VehicleModelData, VehicleTypeData } from '../../domain/models/brand-details.models';

export interface BrandDetailsState {
  vehicleTypes: VehicleTypeData[];
  models: VehicleModelData[];
  modelsLoaded: VehicleModelData[];
  loading: boolean;
  lastLoadedBrandId: number | undefined;
  brandName: string;
}

export const initialBrandDetailsState: BrandDetailsState = {
  vehicleTypes: [],
  models: [],
  modelsLoaded: [],
  loading: false,
  lastLoadedBrandId: undefined,
  brandName: ''
};

export const BrandDetailsStateStore = withState<BrandDetailsState>(initialBrandDetailsState)
