import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Thread } from './Thread.model';
import { Post } from './Post.model';
import { User } from '../user/User.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThreadService {

  private _appUrl = 'API';

  constructor(private http: Http) { }

  thread(id: string) {
    const header = new Headers;
    header.set('id', id);
    return this.http.get(`${this._appUrl}/threadById`, { headers: header }).map(response =>
      response.json()).map(item => Thread.fromJsonWithPosts(item))
  }

  savePost(content: string, userid: string, threadid: string): Observable<Post> {
    return this.http.post(`${this._appUrl}/newPost`, { content: content, poster: userid, threadid: threadid }).map(responce =>
      responce.json()).map(item => new Post(item.content, User.fromJSON(item.poster), item.time));
  }

  deletePost(postid: string, threadid: string) {
    const headers = new Headers();
    headers.append('postId', postid);
    headers.append('threadId', threadid);
    return this.http.delete(`${this._appUrl}/deletePost`, { headers: headers }).map(responce =>
      responce.json()).map(item => item.status);
  }

  editPost(post: Post) {
    return this.http.put(`${this._appUrl}/editPost`, {post: post}).map(responce => responce.json()).map(item => {console.log(item);
    return 'ok'; });
  }

}
