import { Component, OnInit } from '@angular/core';
import { Article } from './article.model';
import { ArticleDataService } from '../article-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  _article: Article;

  constructor(private service: ArticleDataService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => this.service.articleById(param.get('id')).subscribe(article => this._article = article));
  }

  ngOnInit() {
  }

  get article(){
    return this._article;
  }

  getimage() {
    return this._article.image;
  }
}
