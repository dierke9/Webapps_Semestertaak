import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Category } from './Category.model';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryDataService {

  private _appUrl = 'API/categories';

  constructor(private http: Http) { }

  get categories(): Observable<Category[]> {
    return this.http.get(this._appUrl).map(response =>
      response.json().map(item => {
        const cat =  Category.fromJSON(item);
        return cat;
      }
      )
    );
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post(this._appUrl, {category: category}).map(response => response.json())
    .map(res => Category.fromJSON(res));
  }
}
