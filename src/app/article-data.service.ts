import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Article } from "../app/article/article.model"
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleDataService {

  private _appUrl = "http://localhost:4200/API/articles";

  constructor(private http: Http) { }

  get articles(): Observable<Article[]>{
    return this.http.get(this._appUrl).map(response => 
    response.json().map(article =>
    new Article(article.title, article.content, article.image)))
  }

}
