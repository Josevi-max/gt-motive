import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllMakesResponse } from '../models/common.dto';
import { config } from '../../../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CommonApi {
  private readonly http = inject(HttpClient);
  public getAllMakes(): Observable<GetAllMakesResponse> {
    return this.http.get<GetAllMakesResponse>(config.api.URL_BACKEND + '/vehicles/getallmakes?format=json');
  }
}
