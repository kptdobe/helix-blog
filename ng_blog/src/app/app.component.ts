import { Component } from '@angular/core';
import { ContentService } from './content.service';
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
  content: Subject<JsonContent>;

  constructor(private contentService: ContentService) {
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
      console.log('in content subscribe: ', json);
      this.title = json.resource.title;
      this.intro = json.resource.intro;
    });
    interval(10000).subscribe(() => this.loadContent());
    this.loadContent();
  }
}
