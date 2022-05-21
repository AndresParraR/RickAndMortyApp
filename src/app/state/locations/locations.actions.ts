import { createAction, props } from '@ngrx/store';
import { PageState } from '../app.state';
import { Location } from './locations.state';

export const loadLocations = createAction(
  'loadLocations',
  (page: number) => ({ page })
);

export const loadFilterLocations = createAction(
  'loadFilterLocations',
  (name: string, page: number) => ({ name, page })
);
export const loadLocationsSuccess = createAction(
  'loadLocationsSuccess',
  (locations: PageState<Location>) => ({ locations })
);
export const cleanFilterLocations = createAction(
  'cleanFilterLocations',
);
export const loadLocationsFilterSuccess = createAction(
  'loadLocationsFilterSuccess',
  (filterLocations: PageState<Location>) => ({ filterLocations })
);
