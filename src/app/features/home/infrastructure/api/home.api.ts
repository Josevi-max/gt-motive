import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../../config/config';
import { GetAllMakesResponse } from '../models/home.dto';

@Injectable({
  providedIn: 'root',
})
export class HomeApi {
  private readonly http = inject(HttpClient);
  public getAllMakes(): Observable<GetAllMakesResponse> {
    return this.http.get<GetAllMakesResponse>(config.api.URL_BACKEND + '/vehicles/getallmakes?format=json');
  }
}
