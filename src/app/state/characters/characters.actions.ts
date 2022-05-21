import { createAction, props } from '@ngrx/store';
import { PageState } from '../app.state';
import { Character } from './characters.state';

export const loadCharacters = createAction(
  'loadCharacters',
  (page: number) => ({ page })
);

export const loadFilterCharacters = createAction(
  'loadFilterCharacters',
  (name: string, page: number) => ({ name, page })
);
export const loadCharactersSuccess = createAction(
  'loadCharactersSuccess',
  (characters: PageState<Character>) => ({ characters })
);
export const cleanFilterCharacters = createAction(
  'cleanFilterCharacters',
);
export const loadCharactersFilterSuccess = createAction(
  'loadCharactersFilterSuccess',
  (filterCharacters: PageState<Character>) => ({ filterCharacters })
);
