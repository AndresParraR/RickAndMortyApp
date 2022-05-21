import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DialogDetailComponent } from '../shared/components/dialog-detail/dialog-detail.component';
import { SharingService } from '../shared/core/services/sharing.service';
import { AppState, PageState } from '../state/app.state';
import { cleanFilterEpisodes, loadEpisodes, loadFilterEpisodes } from '../state/episodes/episodes.actions';
import { selectAllEpisodes } from '../state/episodes/episodes.selector';
import { Episode } from '../state/episodes/episodes.state';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  data$: Observable<string>;

  allEpisodes$ = this.store.select(selectAllEpisodes);

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
      this.allEpisodes$.subscribe((episodesState) => {
        this.episodes = episodesState.episodes;
        this.filteredEpisodes = episodesState.filterEpisodes;
        this.thereIsEpisodess =
          this.episodes.results.length > 0 ||
          this.filteredEpisodes.results.length > 0;
      })
    );
    this.subscribe$.push(
      this.data$.subscribe((text) => {
        this.search = text;
        this.pageFiltered = 1;
        this.store.dispatch(cleanFilterEpisodes());
        text &&
          this.store.dispatch(
            loadFilterEpisodes(this.search, this.pageFiltered)
          );
      })
    );
    !this.thereIsEpisodess && this.store.dispatch(loadEpisodes(this.page));
  }

  ngOnDestroy(): void {
    this.subscribe$.forEach((e) => e.unsubscribe());
  }

  page: number = 1;

  pageFiltered: number = 1;

  episodes: PageState<Episode> = {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  };

  filteredEpisodes: PageState<Episode> = {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  };

  search: string = '';

  thereIsEpisodess: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      !this.search &&
      this.episodes.info.next
    ) {
      this.page++;
      this.store.dispatch(loadEpisodes(this.page));
    } else if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      this.search &&
      this.filteredEpisodes.info.next
    ) {
      this.pageFiltered++;
      this.store.dispatch(loadFilterEpisodes(this.search, this.pageFiltered));
    }
  }

  openDetailEpisode(Episodes: Episode): void {
    this.dialog.open(DialogDetailComponent, {
      width: '100%',
      maxWidth: '400px',
      data: Episodes,
    });
  }
}
