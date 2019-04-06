import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {MainService} from './main.service';
import {Result} from './result';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  results: Array<Result>;
  errorMessage: string;
  errorGetResults: boolean;
  private errorGetResults$ = new Subject<boolean>();

  constructor(private mainService: MainService, private domSanitizer: DomSanitizer) {
  }

  get noResults(): boolean {
    return this.results && this.results.length === 0;
  }

  ngOnInit() {
    this.errorGetResults$.subscribe(state => this.errorGetResults = state);
    this.errorGetResults$.pipe(debounceTime(5000)).subscribe(() => this.errorGetResults = false);
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  getResults(search: string) {
    this.results = null;
    this.mainService.getResults(search).subscribe(results => {
      this.results = results;
    }, e => {
      let errorMessage;
      if (e.status === 0) {
        errorMessage = e.statusText;
      } else {
        errorMessage = `Ошибка ${e.status}`;
      }
      if (e.error.message) {
        errorMessage += `: ${e.error.message}`;
      }
      this.errorMessage = errorMessage;
      this.errorGetResults$.next(true);
      console.error(e);
    });
  }

}
