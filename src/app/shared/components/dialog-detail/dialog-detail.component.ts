import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from 'src/app/state/characters/characters.state';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css'],
})
export class DialogDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  instanceOfCharacter(): boolean {
    return 'image' in this.data;
  }

  instanceOfLocation(): boolean {
    return 'dimension' in this.data;
  }

  instanceOfEpisode(): boolean {
    return 'air_date' in this.data;
  }
}
