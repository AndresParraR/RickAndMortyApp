import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { LocationState } from './locations.state';

export const selectLocations = (state: AppState) => state.locations;
export const selectAllLocations = createSelector(
  selectLocations,
  (state: LocationState) => state
);
