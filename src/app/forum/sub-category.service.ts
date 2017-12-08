import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Category } from './Category.model';
import 'rxjs/add/operator/map';
import { SubCategory } from './SubCategory.model';
import { Headers } from '@angular/http';
import { Thread } from './Thread.model';

@Injectable()
export class SubCategoryService {

  private _appUrl = 'API';

  constructor(private http: Http) { }

  subCategories(id: string): Observable<Category> {
    const header = new Headers();
    header.set('id', id);
    return this.http.get(`${this._appUrl}/categoryDetail`, { headers: header }).map(response =>
      response.json()).map(item => Category.fromJSONWithSubcats(item));
  }

  subcatDetail(id: string): Observable<SubCategory> {
    const header = new Headers();
    header.set('id', id);
    return this.http.get(`${this._appUrl}/subCatDetail`, { headers: header }).map(response =>
      response.json()).map(item => SubCategory.fromJSON(item));
  }

  addSubcat(subcat: SubCategory, categoryid: string): Observable<SubCategory> {
    return this.http.post(`${this._appUrl}/newSubCat`, { title: subcat.Title, description: subcat.Description, categoryid: categoryid })
      .map(response =>
        response.json()).map(item => SubCategory.fromJSON(item));
  }

  addThread(title: string, post: string, subcatId: string, poster: string) {
    return this.http.post(`${this._appUrl}/addThread`, { title: title, post: post, subcatId: subcatId, poster: poster }).map(responce =>
      responce.json()).map(item => Thread.fromJSON(item));
  }
}
