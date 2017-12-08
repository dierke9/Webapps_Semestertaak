import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../Category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @Output() newCategory = new EventEmitter();
  addCategory: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.addCategory = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.addCategory.valid) {
      const category = new Category(this.addCategory.get('title').value, this.addCategory.get('description').value);
      this.newCategory.next(category);
      this.modal.dismiss();
    }
  }
}
