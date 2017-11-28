import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private _url = 'API/users';
  private _user$: BehaviorSubject<string>;

  constructor(private http : Http) { 
    const currentUser = JSON.parse(localStorage.getItem('currentuser'));
    this._user$ = new BehaviorSubject<string>(
      currentUser && currentUser.username
    );
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  login(username: string, password: string){
    return this.http.post(`${this._url}/login`, {username: username, password: password})
      .map(res => res.json()).map(res=>{
        const id = res._id;
        const token = res.token;
        if(token){
          localStorage.setItem('currentuser',JSON.stringify({username: username, token: token, id: id}));
          this._user$.next(username);
          return true;
        }else{
          return false;
        }
      })
  }

  register(username:string, password: string){
    return this.http.post(`${this._url}/register`,{username: username, password: password})
      .map(res => res.json()).map(res => {
        const token = res.token;
        const id = res._id;
        if(token){
          localStorage.setItem('currentuser',JSON.stringify({username: username, token: token, id: id}));
          this._user$.next(username);
          return true;
        }else{
          return false;
        }
      })
  }

  logout(){
    if(this._user$.getValue){
      localStorage.removeItem('currentuser');
      setTimeout(() => {
        this._user$.next(null);
      });
    }
  }

  checkUniqueUsername(username : string):Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`,{username: username}).map(res => res.json()).map(item => item.username!='alreadyexists');
  }

}
