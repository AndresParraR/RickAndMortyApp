import { Action, createReducer, on } from '@ngrx/store';
import { PageState } from '../app.state';
import {
  cleanFilterCharacters,
  loadCharacters,
  loadCharactersFilterSuccess,
  loadCharactersSuccess,
} from './characters.actions';
import { initialState, CharacterState, Character } from './characters.state';

const _charactersReducer = createReducer(
  initialState,
  on(loadCharactersSuccess, (state, { characters }) => {
    return {
      ...state,
      characters:{
        ...characters,
        results: [...state.characters.results, ...characters.results]
      }
    };
  }),
  on(loadCharactersFilterSuccess, (state, { filterCharacters }) => {
    return {
      ...state,
      filterCharacters:{
        ...filterCharacters,
        results: [...state.filterCharacters.results, ...filterCharacters.results]
      }
    };
  }),
  on(cleanFilterCharacters, (state) => {
    return {
      ...state,
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
  })
);

export function charactersReducer(
  state: CharacterState | undefined,
  action: Action
) {
  return _charactersReducer(state, action);
}
