import { PageState } from '../app.state';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterState {
  characters: PageState<Character>;
  filterCharacters: PageState<Character>;
}
export const initialState: CharacterState = {
  characters: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  } as PageState<Character>,
  filterCharacters: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  } as PageState<Character>,
};

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}
