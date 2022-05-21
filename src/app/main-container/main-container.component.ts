import { Component, OnInit } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharingService } from '../shared/core/services/sharing.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  angularIcon = faAngular;

  value = '';

  constructor(private router: Router, private sharingService: SharingService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.links.forEach((link) => {
          if (link.route == this.router.url) {
            this.titleNavbar = link.title;
            return;
          }
        });
      });
  }

  onChangeSearch() {
    this.sharingService.searchObservableData = this.value;
  }

  opened = false;

  titleNavbar = 'Dashboard';

  links = [
    {
      title: 'Characters',
      route: '/characters',
      isFocused: true,
    },
    {
      title: 'Locations',
      route: '/locations',
      isFocused: false,
    },
    {
      title: 'Episodes',
      route: '/episodes',
      isFocused: false,
    },
  ];
}
