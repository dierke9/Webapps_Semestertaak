import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../article/article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  newArticle: FormGroup;
  @Output() articleEvent = new EventEmitter();
  img: string;
  noFile = false;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.newArticle = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      summary: this.fb.control('', [Validators.required, Validators.maxLength(150)]),
      content: this.fb.control('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.newArticle);
    if (this.img) {
      if (this.newArticle.valid) {
        const article = new Article(this.newArticle.get('title').value,
          this.newArticle.get('content').value, this.img,
          this.newArticle.get('summary').value);
        console.log(article);
        this.articleEvent.next(article);
        this.activeModal.dismiss();
      }
    }else{
      this.noFile = true;
    }
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    this.noFile = false;
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

}
