import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonContent } from '../objects/content.json';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getContent(path): Observable<JsonContent> {
    return this.http.get<JsonContent>(`${path}.json`);
  }
}
