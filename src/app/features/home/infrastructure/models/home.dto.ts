export interface MakeResults {
  Make_ID: number;
  Make_Name: string;
}

export interface GetAllMakesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: MakeResults[];
}