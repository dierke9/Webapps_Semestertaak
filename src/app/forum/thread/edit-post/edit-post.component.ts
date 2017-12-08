import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPost: FormGroup;
  _post: string;

  @Input()
  set post(post: string) {
    if (this.editPost) {
      this.editPost.get('post').setValue(post);
    }
    this._post = post;
  }

  @Output() newPost = new EventEmitter();

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.editPost = this.fb.group({
      post: this.fb.control(this._post, [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit() {
    if (this.editPost.valid) {
      this.newPost.next(this.editPost.get('post').value);
      this.modal.dismiss();
    }
  }
}
