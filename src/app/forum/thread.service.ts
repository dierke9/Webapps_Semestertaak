import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Thread } from './Thread.model';
import { Post } from './Post.model';
import { User } from '../user/User.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThreadService {

  private _appUrl = 'http://localhost:4200/API';
  
  constructor(private http: Http) { }

  thread(id: string){
    var header = new Headers;
    header.set('id',id);
    return this.http.get(`${this._appUrl}/threadById`, {headers: header}).map(response =>
    response.json()).map(item => Thread.fromJsonWithPosts(item))
  }

  savePost(content: string, userid: string, threadid: string): Observable<Post>{
    console.log(content + userid + threadid)
   return this.http.post(`${this._appUrl}/newPost`, {content: content, poster: userid, threadid: threadid}).map(responce =>
    responce.json()).map(item => new Post(item.content, User.fromJSON(item.poster), item.time));
  }

}
