import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Category } from "./category.model"
import 'rxjs/add/operator/map';
import { SubCategory } from './SubCategory.model';
import { Headers } from '@angular/http';

@Injectable()
export class SubCategoryService {

  private _appUrl = 'http://localhost:4200/API';
  
  constructor(private http: Http) { }

  subCategories(id: string): Observable<Category>{
    var header = new Headers();
    header.set('id',id);
    return this.http.get(`${this._appUrl}/categoryDetail`, {headers: header}).map(response =>
    response.json()).map(item => Category.fromJSONWithSubcats(item))
  }

  subcatDetail(id: string): Observable<SubCategory>{
    var header = new Headers();
    header.set('id',id);
    return this.http.get(`${this._appUrl}/subCatDetail`, {headers: header}).map(response =>
    response.json()).map(item => SubCategory.fromJSON(item));
  }
}
