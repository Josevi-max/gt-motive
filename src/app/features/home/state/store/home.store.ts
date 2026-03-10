import { withState, signalStore } from '@ngrx/signals';

export interface HomeState {
  brands: any[]; //VehicleBrand sustituit cuando cree la interfaz
  filteredBrands: any[];
  selectedBrand: any | null;
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

export const HomeStateStore = signalStore(
  { providedIn: 'root' },
  withState<HomeState>(initialHomeState)
);
