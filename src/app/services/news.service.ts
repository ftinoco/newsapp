import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getHeadlines(index: number, sources: any[]): Observable<any> {
    const strSources = sources.map(e => e.id).join(',');
    console.log(strSources);
    return this.http.get(environment.urlBase + 'top-headlines?sources=' + strSources + '&page=' + index +
      '&pageSize=' + environment.pageSize + '&apiKey=' + environment.NewsAPIkey)
      .pipe(map(x => x));
  }

  public getSources(lang: string): Observable<any> {
    return this.http.get(environment.urlBase + 'sources?language=' + lang + '&apiKey=' + environment.NewsAPIkey)
      .pipe(map(x => x));
  }

  public getEverythingNews(index: number, search: string): Observable<any> {
    return this.http.get(environment.urlBase + 'everything?q=' + search + '&language=es&page=' + index +
      '&pageSize=' + environment.pageSize + '&apiKey=' + environment.NewsAPIkey)
      .pipe(map(x => x));
  }

  public getEverythingNewsEN(index: number, search: string): Observable<any> {
    return this.http.get(environment.urlBase + 'everything?q=' + search + '&language=en&page=' + index +
      '&pageSize=' + environment.pageSize + '&apiKey=' + environment.NewsAPIkey)
      .pipe(map(x => x));
  }
}
