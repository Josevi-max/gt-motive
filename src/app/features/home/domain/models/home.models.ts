export interface VehicleBrand {
  id: number;
  name: string;
}

export type SortOrder = 'asc' | 'desc';

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc'
}