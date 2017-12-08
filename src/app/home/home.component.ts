import { Component, OnInit } from '@angular/core';
import { ArticleDataService } from '../article-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddArticleComponent } from './add-article/add-article.component';
import { AuthenticationService } from '../user/authentication.service';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _articles: Article[];
  img: string;

  constructor(private serivce: ArticleDataService, private modalService: NgbModal, private authService: AuthenticationService) {
    serivce.articles.subscribe(articles => this._articles = articles);
  }

  ngOnInit() {
  }

  get articles() {
    return this._articles;
  }

  addArticle() {
    console.log('New Article');
    const modal = this.modalService.open(AddArticleComponent);
    modal.componentInstance.articleEvent
    .subscribe(article => this.serivce.addArticle(article, this.authService.user$.getValue())
    .subscribe( savedArticle => this._articles.unshift(savedArticle)));
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      console.log(file);
      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.img = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  get imgsrc(){
    return 'data:image/png;base64,' + this.img;
  }

  articleImage(index) {
    return this._articles[index].image;
  }

  get isAdmin(){
    return this.authService.isAdmin;
  }

}
