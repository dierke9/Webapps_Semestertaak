import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './User.model';

@Injectable()
export class AuthenticationService {
  private _url = 'API/users';
  private _user$: BehaviorSubject<string>;
  private _redirect: string;
  private _admin: boolean;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentuser'));
    this._user$ = new BehaviorSubject<string>(
      currentUser && currentUser.username
    );
    if (this._user$.getValue() !== null) {
      this.getAdmin().subscribe(data => this._admin = data);
    }
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  login(username: string, password: string) {
    return this.http.post(`${this._url}/login`, { username: username, password: password })
      .map(res => res.json()).map(res => {
        const id = res._id;
        const token = res.token;
        if (token) {
          localStorage.setItem('currentuser', JSON.stringify({ username: username, token: token, id: id }));
          this._user$.next(username);
          this.getAdmin().subscribe(data => this._admin = data);
          return true;
        } else {
          return false;
        }
      });
  }

  register(username: string, password: string) {
    return this.http.post(`${this._url}/register`, { username: username, password: password })
      .map(res => res.json()).map(res => {
        const token = res.token;
        const id = res._id;
        if (token) {
          localStorage.setItem('currentuser', JSON.stringify({ username: username, token: token, id: id }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    if (this._user$.getValue) {
      localStorage.removeItem('currentuser');
      setTimeout(() => {
        this._user$.next(null);
      });
    }
  }

  getAdmin() {
    const headers = new Headers();
    headers.append('username', this._user$.getValue());
    console.log(headers);
    return this.http.get(`${this._url}/getAdmin`, { headers: headers }).map(response => response.json()).map(item => {
      if (item === 'admin') {
        return true;
      } else {
        return false;
      }
    });
  }

  checkUniqueUsername(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username: username })
      .map(res => res.json()).map(item => item.username !== 'alreadyexists');
  }

  saveSettings(bio: string, birthdate: string, location: string): Observable<string> {
    return this.http.post(`${this._url}/saveSettings`, { username: this.user$.value, bio: bio, birthdate: birthdate, location: location })
      .map(responce => responce.json());
  }

  get redirectURL() {
    return this._redirect;
  }

  set redirectURL(url: string) {
    this._redirect = url;
  }

  get isAdmin() {
    return this._admin;
  }
}
