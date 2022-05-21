import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class SharingService {
  constructor() {}

  private searchObservablePrivate: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  get searchObservable() {
    return this.searchObservablePrivate.asObservable();
  }

  set searchObservableData(search: string) {
    this.searchObservablePrivate.next(search);
  }
}
