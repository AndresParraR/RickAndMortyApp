import { PageState } from '../app.state';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeState {
  episodes: PageState<Episode>;
  filterEpisodes: PageState<Episode>;
}
export const initialState: EpisodeState = {
  episodes: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  } as PageState<Episode>,
  filterEpisodes: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  } as PageState<Episode>,
};