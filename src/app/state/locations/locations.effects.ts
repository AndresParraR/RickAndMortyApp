import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { LocationsService } from 'src/app/services/locations.service';
import { loadLocationsSuccess, loadLocations, loadFilterLocations, loadLocationsFilterSuccess } from './locations.actions';
import { catchError, concatMap, exhaustMap, from, map, mergeMap } from 'rxjs';

@Injectable()
export class LocationsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private LocationsService: LocationsService
  ) {}

  loadLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLocations),
      exhaustMap((req) =>
        this.LocationsService
          .getLocationsByPage(req.page)
          .pipe(map((res) => loadLocationsSuccess(res)))
      )
    );
  });

  loadFilterLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFilterLocations),
      exhaustMap((req) =>
        this.LocationsService
          .filterLocation(req.name, req.page)
          .pipe(map((res) => loadLocationsFilterSuccess(res)))
      )
    );
  });
}
