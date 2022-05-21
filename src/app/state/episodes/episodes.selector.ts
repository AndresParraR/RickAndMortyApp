import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { EpisodeState } from './episodes.state';

export const selectEpisode = (state: AppState) => state.episodes;
export const selectAllEpisodes = createSelector(
  selectEpisode,
  (state: EpisodeState) => state
);
