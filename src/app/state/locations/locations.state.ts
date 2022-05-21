import { PageState } from '../app.state';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationState {
  locations: PageState<Location>;
  filterLocations: PageState<Location>;
}
export const initialState: LocationState = {
  locations: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  } as PageState<Location>,
  filterLocations: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  } as PageState<Location>,
};