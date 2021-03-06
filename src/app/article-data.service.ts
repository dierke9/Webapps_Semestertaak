import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Article } from '../app/article/article.model';
import 'rxjs/add/operator/map';
import { Comment } from './article/comment.model';

@Injectable()
export class ArticleDataService {

  private _appUrl = 'API/articles';

  constructor(private http: Http) { }

  get articles(): Observable<Article[]> {
    return this.http.get(this._appUrl).map(response =>
      response.json().map(article => {
        return Article.fromJSON(article);
      }));
  }

  addArticle(article: Article, poster: string): Observable<Article> {
    console.log(article);
    return this.http.post(`${this._appUrl}/addArticle`, { article: article, poster: poster })
      .map(responce => responce.json()).map(item => Article.fromJSON(item));
  }

  articleById(id: string): Observable<Article> {
    const header = new Headers();
    header.append('id', id);
    return this.http.get(`${this._appUrl}/articleById`, { headers: header }).map(response =>
      response.json()).map(item => { console.log(item); return Article.fromJSONWithComment(item);});
  }

  addComment(comment: string, articleId: string, user: string): Observable<Comment> {
    return this.http.post(`${this._appUrl}/addComment`, { comment: comment, articleId: articleId, user: user })
      .map(response => response.json()).map(item => {
        console.log(item);
        return Comment.fromJSON(item);
      });
  }

}
