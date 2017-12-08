import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.css']
})
export class AddThreadComponent implements OnInit {
  addThread: FormGroup;
  @Output() newThread = new EventEmitter();

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.addThread = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      post: this.fb.control('', [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit() {
    if (this.addThread.valid) {
      this.newThread.next({ title: this.addThread.get('title').value, post: this.addThread.get('post').value });
      this.modal.dismiss();
    }
  }

}
