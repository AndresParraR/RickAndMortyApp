import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/state/characters/characters.state';
import { Location } from 'src/app/state/locations/locations.state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  item!: any;

  constructor() {}

  instanceOfCharacter(): boolean {
    return 'image' in this.item;
  }

  instanceOfLocation(): boolean {
    return 'dimension' in this.item;
  }

  instanceOfEpisode(): boolean {
    return 'air_date' in this.item;
  }

  ngOnInit(): void {}
}
