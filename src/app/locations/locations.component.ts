import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DialogDetailComponent } from '../shared/components/dialog-detail/dialog-detail.component';
import { SharingService } from '../shared/core/services/sharing.service';
import { AppState, PageState } from '../state/app.state';
import { cleanFilterLocations, loadFilterLocations, loadLocations } from '../state/locations/locations.actions';
import { selectAllLocations } from '../state/locations/locations.selector';
import { Location } from '../state/locations/locations.state';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  data$: Observable<string>;

  allLocations$ = this.store.select(selectAllLocations);

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
      this.allLocations$.subscribe((locationsState) => {
        this.locations = locationsState.locations;
        this.filteredLocations = locationsState.filterLocations;
        this.thereIsLocationss =
          this.locations.results.length > 0 ||
          this.filteredLocations.results.length > 0;
      })
    );
    this.subscribe$.push(
      this.data$.subscribe((text) => {
        this.search = text;
        this.pageFiltered = 1;
        this.store.dispatch(cleanFilterLocations());
        text &&
          this.store.dispatch(
            loadFilterLocations(this.search, this.pageFiltered)
          );
      })
    );
    !this.thereIsLocationss && this.store.dispatch(loadLocations(this.page));
  }

  ngOnDestroy(): void {
    this.subscribe$.forEach((e) => e.unsubscribe());
  }

  page: number = 1;

  pageFiltered: number = 1;

  locations: PageState<Location> = {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  };

  filteredLocations: PageState<Location> = {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  };

  search: string = '';

  thereIsLocationss: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      !this.search &&
      this.locations.info.next
    ) {
      this.page++;
      this.store.dispatch(loadLocations(this.page));
    } else if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      this.search &&
      this.filteredLocations.info.next
    ) {
      this.pageFiltered++;
      this.store.dispatch(loadFilterLocations(this.search, this.pageFiltered));
    }
  }

  openDetailLocation(locations: Location): void {
    this.dialog.open(DialogDetailComponent, {
      width: '100%',
      maxWidth: '400px',
      data: locations,
    });
  }

}
