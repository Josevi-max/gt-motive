import { withState } from '@ngrx/signals';
import { VehicleBrand } from '../../domain/models/home.models';

export interface HomeState {
  brands: VehicleBrand[];
  filteredBrands: VehicleBrand[];
  selectedBrand: VehicleBrand | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  totalItems: number;
}

export const initialHomeState: HomeState = {
  brands: [],
  filteredBrands: [],
  selectedBrand: null,
  loading: false,
  error: null,
  searchTerm: '',
  totalItems: 0
};

export const HomeStateStore = withState<HomeState>(initialHomeState)
