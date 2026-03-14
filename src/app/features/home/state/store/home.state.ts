import { withState } from '@ngrx/signals';
import { SortOrder } from '../../domain/models/home.models';

export interface HomeState {
  orderedBrands:  SortOrder;
  searchTerm: string;
}

export const initialHomeState: HomeState = {
  orderedBrands: 'asc',
  searchTerm: '',
};

export const HomeStateStore = withState<HomeState>(initialHomeState)
