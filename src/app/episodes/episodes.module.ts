import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { CardModule } from '../shared/components/card/card.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { episodesReducer } from '../state/episodes/episodes.reducers';
import { EpisodesEffects } from '../state/episodes/episodes.effects';
import { EpisodesComponent } from './episodes.component';


@NgModule({
  declarations: [EpisodesComponent],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    CardModule,
    StoreModule.forFeature('episodes', episodesReducer),
    EffectsModule.forFeature([EpisodesEffects]),
  ]
})
export class EpisodesModule { }
