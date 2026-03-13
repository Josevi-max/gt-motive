export interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface VehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface BrandDetailsApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleModel[];
}

export interface TypesVehicleApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleType[];
}