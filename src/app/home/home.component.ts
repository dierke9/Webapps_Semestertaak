import { Component, OnInit } from '@angular/core';
import {ArticleDataService} from '../article-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleDataService]
})
export class HomeComponent implements OnInit {

  private _articles;

  constructor(private serivce: ArticleDataService) {
    this._articles = serivce.articles;
   }

  ngOnInit() {
  }

  get articles(){
    return this._articles;
  }

}
