import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsService } from 'src/app/services/news.service';
import { Subscription, concat, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.css']
})
export class HeadlinesComponent implements OnInit {

  lang = 'es';
  activeIndex = 1;  
  isLoading = true;
  msg: string = '';
  pageSize: number = 0;
  articles: any[] = [];
  totalResults: number = 0; 
  subscription: Subscription;

  constructor(private newServices: NewsService) { }

  ngOnInit() {
    this.pageSize = environment.pageSize
    this.showNews(this.activeIndex);
  }

  showNews(index: number) {
    this.isLoading = true;
    const that = this;
    this.subscription = this.newServices.getSources(this.lang).pipe(mergeMap(x =>
      this.newServices.getHeadlines(index, x.sources))).subscribe({
        next(resp) {
          if (resp.status === 'error') {
            that.msg = resp.message;
          } else { 
            that.totalResults = resp.totalResults; 
            that.articles = resp.articles;
          }
        },
        complete() {
          that.isLoading = false;
        }
      });
    this.activeIndex = index;
    window.scroll(0, 0);
  }

  dismissAlert() {
    this.msg = '';
  }

  changeLanguage(language) {
    this.activeIndex = 1;
    this.lang = language;
    this.showNews(this.activeIndex);
  }

  pageChanged(e) {
    this.activeIndex = e; 
    this.showNews(this.activeIndex);
  } 
}
