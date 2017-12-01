import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Category } from "./Category.model"
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryDataService {

  private _appUrl = 'API/categories';
  
  constructor(private http: Http) { }

  get categories(): Observable<Category[]> {
    return this.http.get(this._appUrl).map(response =>
      response.json().map(item =>{
        var cat =  Category.fromJSON(item);
        return cat;
      }    
      )
    );
  }
}