import { Action, createReducer, on } from '@ngrx/store';
import { PageState } from '../app.state';
import {
  cleanFilterEpisodes,
  loadEpisodesFilterSuccess,
  loadEpisodesSuccess,
} from './episodes.actions';
import { initialState, EpisodeState } from './episodes.state';

const _episodesReducer = createReducer(
  initialState,
  on(loadEpisodesSuccess, (state, { episodes }) => {
    return {
      ...state,
      episodes:{
        ...episodes,
        results: [...state.episodes.results, ...episodes.results]
      }
    };
  }),
  on(loadEpisodesFilterSuccess, (state, { filterEpisodes }) => {
    return {
      ...state,
      filterEpisodes:{
        ...filterEpisodes,
        results: [...state.filterEpisodes.results, ...filterEpisodes.results]
      }
    };
  }),
  on(cleanFilterEpisodes, (state) => {
    return {
      ...state,
      filterEpisodes: {
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

export function episodesReducer(
  state: EpisodeState | undefined,
  action: Action
) {
  return _episodesReducer(state, action);
}
