import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { EpisodesService } from 'src/app/services/episodes.service';
import { loadEpisodesSuccess, loadEpisodes, loadFilterEpisodes, loadEpisodesFilterSuccess } from './episodes.actions';
import { catchError, concatMap, exhaustMap, from, map, mergeMap } from 'rxjs';

@Injectable()
export class EpisodesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private episodesService: EpisodesService
  ) {}

  loadEpisodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEpisodes),
      exhaustMap((req) =>
        this.episodesService
          .getEpisodesByPage(req.page)
          .pipe(map((res) => loadEpisodesSuccess(res)))
      )
    );
  });

  loadFilterEpisodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFilterEpisodes),
      exhaustMap((req) =>
        this.episodesService
          .filterEpisode(req.name, req.page)
          .pipe(map((res) => loadEpisodesFilterSuccess(res)))
      )
    );
  });
}
