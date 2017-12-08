import { Component, OnInit } from '@angular/core';
import { Article } from './article.model';
import { ArticleDataService } from '../article-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  _article: Article;
  newComment: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private service: ArticleDataService, private route: ActivatedRoute, private authService: AuthenticationService, private fb: FormBuilder) {
    this.route.paramMap.subscribe(param => this.service.articleById(param.get('id')).subscribe(article => this._article = article));
  }

  ngOnInit() {
    this.newComment = this.fb.group({
      comment: this.fb.control('', [Validators.required])
    });
  }

  get article() {
    return this._article;
  }

  getimage() {
    return this._article.image;
  }

  get loggedIn() {
    return this.authService.user$;
  }

  onSubmit() {
    if (this.newComment.valid) {
      this.service.addComment(this.newComment.get('comment').value, this._article.id, this.authService.user$.getValue())
        .subscribe(comment => this._article.comments.push(comment));
    }
  }
}
