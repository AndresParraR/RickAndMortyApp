import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CharactersService } from 'src/app/services/characters.service';
import { loadCharactersSuccess, loadCharacters, loadFilterCharacters, loadCharactersFilterSuccess } from './characters.actions';
import { catchError, concatMap, exhaustMap, from, map, mergeMap } from 'rxjs';

@Injectable()
export class CharactersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private charactersService: CharactersService
  ) {}

  loadCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCharacters),
      exhaustMap((req) =>
        this.charactersService
          .getCharactersByPage(req.page)
          .pipe(map((res) => loadCharactersSuccess(res)))
      )
    );
  });

  loadFilterCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFilterCharacters),
      exhaustMap((req) =>
        this.charactersService
          .filterCharacter(req.name, req.page)
          .pipe(map((res) => loadCharactersFilterSuccess(res)))
      )
    );
  });
}
