import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../../../../config/config';
import { Observable } from 'rxjs';
import { BrandDetailsApiResponse, TypesVehicleApiResponse } from '../models/brand-details.dto';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailsApi {
  private readonly httpClient = inject(HttpClient);

  public getBrandDetails(brandId: number): Observable<BrandDetailsApiResponse> {
    return this.httpClient.get<BrandDetailsApiResponse>(`${config.api.URL_BACKEND}/vehicles/getmodelsformakeid/${brandId}?format=json`);
  }

  public getVehicleTypesForBrand(brandId: number): Observable<TypesVehicleApiResponse> {
    return this.httpClient.get<TypesVehicleApiResponse>(`${config.api.URL_BACKEND}/vehicles/getvehicletypesformakeid/${brandId}?format=json`);
  }
}
