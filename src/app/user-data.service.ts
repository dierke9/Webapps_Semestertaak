import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './login-register/user.model'

@Injectable()
export class UserDataService {
  private _httpUrl = "http://localhost:4200/API/user/register"
  constructor(private http: Http) { }

  register(user: User){
    this.http.post(this._httpUrl, user);
  }

}
