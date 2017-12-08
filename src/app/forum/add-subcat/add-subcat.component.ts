import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategory } from '../SubCategory.model';

@Component({
  selector: 'app-add-subcat',
  templateUrl: './add-subcat.component.html',
  styleUrls: ['./add-subcat.component.css']
})
export class AddSubcatComponent implements OnInit {
  addSubcat: FormGroup;
  @Output() newSubcat = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.addSubcat = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit() {
    if (this.addSubcat.valid) {
      const subCat = new SubCategory(this.addSubcat.get('title').value, this.addSubcat.get('description').value);
      this.newSubcat.next(subCat);
      this.activeModal.dismiss();
    }
  }

}
