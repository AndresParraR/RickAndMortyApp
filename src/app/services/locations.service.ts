import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PageState } from '../state/app.state';
import { Location } from '../state/locations/locations.state';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  filterLocation(
    name: string,
    page: number
  ): Observable<PageState<Location>> {
    return this.http
      .get<any>(`${this.API}/location/?page=${page}&name=${name}`)
      .pipe(map((response) => response));
  }

  getLocationsByPage(page: number): Observable<PageState<Location>> {
    return this.http
      .get<any>(`${this.API}/location/?page=${page}`)
      .pipe(map((response) => response));
  }
}
