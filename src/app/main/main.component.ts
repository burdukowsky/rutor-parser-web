import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {MainService} from './main.service';
import {Result} from './result';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private search: string;
  private results: Array<Result>;

  constructor(private mainService: MainService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  onMainFormSubmit() {
    this.mainService.getResults(this.search).subscribe(results => {
      this.results = results;
    }, e => {
      console.error(e);
    });
  }

}
