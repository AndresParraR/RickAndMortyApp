import { Action, createReducer, on } from '@ngrx/store';
import { PageState } from '../app.state';
import {
  cleanFilterLocations,
  loadLocations,
  loadLocationsFilterSuccess,
  loadLocationsSuccess,
} from './locations.actions';
import { initialState, LocationState } from './locations.state';

const _locationsReducer = createReducer(
  initialState,
  on(loadLocationsSuccess, (state, { locations }) => {
    return {
      ...state,
      locations:{
        ...locations,
        results: [...state.locations.results, ...locations.results]
      }
    };
  }),
  on(loadLocationsFilterSuccess, (state, { filterLocations }) => {
    return {
      ...state,
      filterLocations:{
        ...filterLocations,
        results: [...state.filterLocations.results, ...filterLocations.results]
      }
    };
  }),
  on(cleanFilterLocations, (state) => {
    return {
      ...state,
      filterLocations: {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      },
    };
  })
);

export function locationsReducer(
  state: LocationState | undefined,
  action: Action
) {
  return _locationsReducer(state, action);
}
