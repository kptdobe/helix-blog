import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonPostsContent } from '../objects/posts.json';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getContent(path): Observable<JsonPostsContent> {
    return this.http.get<JsonPostsContent>(`${path}.posts.json`);
  }
}
