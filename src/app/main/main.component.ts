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
  search: string;
  results: Array<Result>;
  errorGetResults: boolean;
  private errorGetResults$ = new Subject<boolean>();

  constructor(private mainService: MainService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.errorGetResults$.subscribe(state => this.errorGetResults = state);
    this.errorGetResults$.pipe(debounceTime(5000)).subscribe(() => this.errorGetResults = false);
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  onMainFormSubmit() {
    this.results = [];
    this.mainService.getResults(this.search).subscribe(results => {
      this.results = results;
    }, e => {
      this.errorGetResults$.next(true);
      console.error(e);
    });
  }

}
