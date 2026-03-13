import { withState } from '@ngrx/signals';
import { SortOrder } from '../../domain/models/home.models';
import { VehicleBrand } from '../../../../core/features/commons/models/commons.models';

export interface HomeState {
  filteredBrands: VehicleBrand[];
  orderedBrands:  SortOrder;
  searchTerm: string;
  totalItems: number;
}

export const initialHomeState: HomeState = {
  filteredBrands: [],
  orderedBrands: 'asc',
  searchTerm: '',
  totalItems: 0
};

export const HomeStateStore = withState<HomeState>(initialHomeState)
