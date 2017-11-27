import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Thread } from './Thread.model';

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

}
