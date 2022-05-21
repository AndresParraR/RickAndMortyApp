import { createAction, props } from '@ngrx/store';
import { PageState } from '../app.state';
import { Episode } from './episodes.state';

export const loadEpisodes = createAction(
  'loadEpisodes',
  (page: number) => ({ page })
);

export const loadFilterEpisodes = createAction(
  'loadFilterEpisodes',
  (name: string, page: number) => ({ name, page })
);
export const loadEpisodesSuccess = createAction(
  'loadEpisodesSuccess',
  (episodes: PageState<Episode>) => ({ episodes })
);
export const cleanFilterEpisodes = createAction(
  'cleanFilterEpisodes',
);
export const loadEpisodesFilterSuccess = createAction(
  'loadEpisodesFilterSuccess',
  (filterEpisodes: PageState<Episode>) => ({ filterEpisodes })
);
