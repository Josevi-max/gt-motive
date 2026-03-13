import { withState } from '@ngrx/signals';
import { SortOrder, VehicleBrand } from '../../domain/models/home.models';

export interface HomeState {
  brands: VehicleBrand[];
  filteredBrands: VehicleBrand[];
  orderedBrands:  SortOrder;
  loading: boolean;
  searchTerm: string;
  totalItems: number;
}

export const initialHomeState: HomeState = {
  brands: [],
  filteredBrands: [],
  orderedBrands: 'asc',
  loading: false,
  searchTerm: '',
  totalItems: 0
};

export const HomeStateStore = withState<HomeState>(initialHomeState)
