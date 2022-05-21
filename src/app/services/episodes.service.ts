import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PageState } from '../state/app.state';
import { Episode } from '../state/episodes/episodes.state';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  filterEpisode(
    name: string,
    page: number
  ): Observable<PageState<Episode>> {
    return this.http
      .get<any>(`${this.API}/episode/?page=${page}&name=${name}`)
      .pipe(map((response) => response));
  }

  getEpisodesByPage(page: number): Observable<PageState<Episode>> {
    return this.http
      .get<any>(`${this.API}/episode/?page=${page}`)
      .pipe(map((response) => response));
  }
}
