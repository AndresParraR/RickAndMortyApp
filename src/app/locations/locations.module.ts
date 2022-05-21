import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { CardModule } from '../shared/components/card/card.module';
import { StoreModule } from '@ngrx/store';
import { locationsReducer } from '../state/locations/locations.reducers';
import { LocationsEffects } from '../state/locations/locations.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    CardModule,
    StoreModule.forFeature('locations', locationsReducer),
    EffectsModule.forFeature([LocationsEffects]),
  ],
})
export class LocationsModule {}
