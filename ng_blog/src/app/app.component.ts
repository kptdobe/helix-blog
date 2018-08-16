import { Component } from '@angular/core';
import { PostsService } from './posts.service';
import { JsonPostsContent } from '../objects/posts.json';
import { JsonContent } from '../objects/content.json';
import { Observable, interval, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  intro: string;
  posts: JsonContent[];
  content: Subject<JsonPostsContent>;

  constructor(private contentService: PostsService) {
    this.content = new ReplaySubject<any>(1);
  }

  loadContent(): void {
    this.contentService.getContent('/README')
      .subscribe(json => {
        console.log('#app.component: content loaded', json);
        this.content.next(json);
      });
  }

  ngOnInit() {
    this.content.asObservable().subscribe(json => {
      this.title = json.resource.title;
      this.intro = json.resource.intro;
      this.posts = json.resource.posts;
    });
    interval(60000).subscribe(() => this.loadContent());
    this.loadContent();
  }
}
