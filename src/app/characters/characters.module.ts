import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersService } from '../services/characters.service';
import { CharactersComponent } from './characters.component';
import { CardModule } from '../shared/components/card/card.module';
import { StoreModule } from '@ngrx/store';
import { charactersReducer } from '../state/characters/characters.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffects } from '../state/characters/characters.effects';

@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    CardModule,
    StoreModule.forFeature('characters', charactersReducer),
    EffectsModule.forFeature([CharactersEffects]),
  ],
  providers: [CharactersService],
})
export class CharactersModule {}
