import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Result} from './result';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  getResults(search: string): Observable<Array<Result>> {
    return this.http.get<Array<Result>>(environment.api + '/' + encodeURIComponent(search));
  }
}
