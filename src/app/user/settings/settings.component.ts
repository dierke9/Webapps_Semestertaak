import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AuthenticationService } from '../authentication.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: FormGroup;

  constructor(private fb: FormBuilder, private authservice: AuthenticationService, config: NgbDatepickerConfig) { 
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
  }

  ngOnInit() {
    this.settings = this.fb.group({
      bio: this.fb.control('', [Validators.minLength(10)]),
      location: this.fb.control('', []),
      birthdate: this.fb.control('', [])
    });
    this.authservice.getSettings().subscribe(data => {
      this.settings.get('bio').setValue(data.bio);
      this.settings.get('location').setValue(data.localtion);
      const date = data.birthdate.split('-');
      // tslint:disable-next-line:max-line-length
      this.settings.get('birthdate').setValue({year: Number.parseInt(date[0]), month: Number.parseInt(date[1]), day: Number.parseInt(date[2])});
    });
  }

  createInterest(): FormGroup {
    return this.fb.group({
      interest: this.fb.control('', [Validators.minLength(5)])
    });
  }

  onSave() {
    console.log(this.settings.value);
    const date = this.settings.get('birthdate').value;
    const datestring = date.year + '-' + date.month + '-' + date.day;
    this.authservice.saveSettings(this.settings.get('bio').value, datestring, this.settings.get('location').value)
    .subscribe(data => console.log(data));
  }

}
