import { charactersReducer } from './characters/characters.reducers';
import { CharacterState } from './characters/characters.state';
import { EpisodeState } from './episodes/episodes.state';
import { LocationState } from './locations/locations.state';

export interface AppState {
  characters: CharacterState;
  locations: LocationState;
  episodes: EpisodeState;
}

export interface PageState<T>{
  info: {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null,
  },
  results: T[]
}

// export const appReducer = {
//   characters: charactersReducer,
// }