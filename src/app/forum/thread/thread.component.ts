import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../thread.service';
import { ActivatedRoute } from '@angular/router';
import { Thread } from '../Thread.model';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../user/authentication.service';
import { Post } from '../Post.model';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  private _thread: Thread;
  page: number = 1;
  newpost : FormGroup;

  constructor(private serivce: ThreadService, private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthenticationService) { 
    this.route.paramMap.subscribe(pa => this.serivce.thread(pa.get('id')).subscribe(data => this._thread = data));
  }

  ngOnInit() {
    this.newpost = this.fb.group({post: this.fb.control('',[Validators.minLength(10)])});
  }

  get Thread(){
    return this._thread;
  }

  get PostCount(){
    return this._thread.posts.length;
  }

  get start(){
    return this.page * 10 - 10;
  }

  get end(){
    return this.page * 10;
  }

  onNewPost(){
    var content = this.newpost.get('post').value;
    var username;
    console.log("New post triggered");
    console.log(this._thread);
    var threadid = this._thread.id;
    this.authService.user$.subscribe(data => {username = data; this.serivce.savePost(content, username, threadid).subscribe(post => this._thread.posts.push(post));});
  }

}
