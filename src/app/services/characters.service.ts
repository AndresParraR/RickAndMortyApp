import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Character } from '../state/characters/characters.state';
import { Observable } from 'rxjs';
import { PageState } from '../state/app.state';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  filterCharacter(
    name: string,
    page: number
  ): Observable<PageState<Character>> {
    return this.http
      .get<any>(`${this.API}/character/?page=${page}&name=${name}`)
      .pipe(map((response) => response));
  }

  getCharactersByPage(page: number): Observable<PageState<Character>> {
    return this.http
      .get<any>(`${this.API}/character/?page=${page}`)
      .pipe(map((response) => response));
  }
}
