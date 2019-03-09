import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Result} from './result';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  getResults(search: string): Observable<Array<Result>> {
    return this.http.get<Array<Result>>(`http://192.168.0.39:8080/${encodeURIComponent(search)}`);
  }
}
