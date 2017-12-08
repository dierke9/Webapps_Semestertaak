import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../thread.service';
import { ActivatedRoute } from '@angular/router';
import { Thread } from '../Thread.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../user/authentication.service';
import { Post } from '../Post.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { EditPostComponent } from './edit-post/edit-post.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  private _thread: Thread;
  page = 1;
  newpost: FormGroup;

  constructor(private serivce: ThreadService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private modalService: NgbModal) {
    this.route.paramMap.subscribe(pa => this.serivce.thread(pa.get('id')).subscribe(data => this._thread = data));
  }

  ngOnInit() {
    this.newpost = this.fb.group({ post: this.fb.control('', [Validators.minLength(10)]) });
  }

  get Thread() {
    return this._thread;
  }

  get PostCount() {
    return this._thread.posts.length;
  }

  get start() {
    return this.page * 10 - 10;
  }

  get end() {
    return this.page * 10;
  }

  onNewPost() {
    if (this.newpost.valid) {
      const content = this.newpost.get('post').value;
      let username;
      console.log(this._thread);
      const threadid = this._thread.id;
      this.authService.user$.subscribe(data => {
        username = data; this.serivce.savePost(content, username, threadid)
          .subscribe(post => this._thread.posts.push(post));
      });
    }
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  deletePost(index) {
    this.serivce.deletePost(this._thread.posts[index].id, this._thread.id)
    .subscribe(success => {
      this._thread.posts.splice(index, 1);
    })
  }

  editPost(index) {
    const modal = this.modalService.open(EditPostComponent);
    modal.componentInstance.post = this._thread.posts[index].content;
    modal.componentInstance.newPost.subscribe(content => {
      const post = this._thread.posts[index];
      post.content = content;
      this.serivce.editPost(post).subscribe(asnwer => {});
    })
  }

}
