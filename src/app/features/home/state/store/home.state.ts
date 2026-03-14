import { withState } from '@ngrx/signals';
import { SortOrder } from '../../domain/models/home.models';

export interface HomeState {
  orderedBrands:  SortOrder;
  searchTerm: string;
  totalItems: number;
}

export const initialHomeState: HomeState = {
  orderedBrands: 'asc',
  searchTerm: '',
  totalItems: 0
};

export const HomeStateStore = withState<HomeState>(initialHomeState)
