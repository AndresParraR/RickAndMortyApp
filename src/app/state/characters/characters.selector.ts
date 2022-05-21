import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CharacterState } from './characters.state';

export const selectCharacters = (state: AppState) => state.characters;
export const selectAllCharacters = createSelector(
  selectCharacters,
  (state: CharacterState) => state
);
