import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { CharactersService } from '../services/characters.service';
import { DialogDetailComponent } from '../shared/components/dialog-detail/dialog-detail.component';
import { SharingService } from '../shared/core/services/sharing.service';
import { AppState, PageState } from '../state/app.state';
import {
  cleanFilterCharacters,
  loadCharacters,
  loadFilterCharacters,
} from '../state/characters/characters.actions';
import { selectAllCharacters } from '../state/characters/characters.selector';
import { Character } from '../state/characters/characters.state';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  data$: Observable<string>;

  allCharacters$ = this.store.select(selectAllCharacters);

  subscribe$: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    sharingService: SharingService,
    public dialog: MatDialog
  ) {
    this.data$ = sharingService.searchObservable;
  }

  ngOnInit(): void {
    this.subscribe$.push(
      this.allCharacters$.subscribe((characterState) => {
        this.characters = characterState.characters;
        this.filteredCharacters = characterState.filterCharacters;
        this.thereIsCharacters =
          this.characters.results.length > 0 ||
          this.filteredCharacters.results.length > 0;
      })
    );
    this.subscribe$.push(
      this.data$.subscribe((text) => {
        this.search = text;
        this.pageFiltered = 1;
        this.store.dispatch(cleanFilterCharacters());
        text &&
          this.store.dispatch(
            loadFilterCharacters(this.search, this.pageFiltered)
          );
      })
    );
    !this.thereIsCharacters && this.store.dispatch(loadCharacters(this.page));
  }

  ngOnDestroy(): void {
    this.subscribe$.forEach((e) => e.unsubscribe());
  }

  page: number = 1;

  pageFiltered: number = 1;

  characters: PageState<Character> = {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  };

  filteredCharacters: PageState<Character> = {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  };

  search: string = '';

  thereIsCharacters: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      !this.search &&
      this.characters.info.next
    ) {
      this.page++;
      this.store.dispatch(loadCharacters(this.page));
    } else if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      this.search &&
      this.filteredCharacters.info.next
    ) {
      this.pageFiltered++;
      this.store.dispatch(loadFilterCharacters(this.search, this.pageFiltered));
    }
  }

  openDetailCharacter(character: Character): void {
    this.dialog.open(DialogDetailComponent, {
      width: '100%',
      maxWidth: '400px',
      data: character,
    });
  }
}
