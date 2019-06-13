import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Result} from './result';
import {AppConfig} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,
              private appConfig: AppConfig) {
  }

  getResults(search: string): Observable<Array<Result>> {
    return this.http.get<Array<Result>>(this.appConfig.api + '/' + encodeURIComponent(search));
  }
}
