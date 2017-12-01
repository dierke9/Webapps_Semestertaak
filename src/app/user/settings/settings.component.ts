import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators,FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: FormGroup;

  constructor(private fb: FormBuilder, private authservice: AuthenticationService) { }

  ngOnInit() {
    this.settings = this.fb.group({
      bio: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      interests: this.fb.array([this.createInterest()])
    });
    this.interests.statusChanges.debounceTime(400).distinctUntilChanged().subscribe(data =>{
      console.log(data) 
      if(data === 'VALID'){
        this.interests.push(this.createInterest());
      }
    })
  }

  createInterest(): FormGroup{
    return this.fb.group({
      interest: this.fb.control('',[Validators.minLength(5)])
    })
  }

  get interests(): FormArray{
    return <FormArray>this.settings.get('interests');
  }

  onSave(){
    let inters = [];
    console.log(this.settings.value);
    for(let interst of this.settings.value.interests){
      if(interst.interest.length > 4){
        inters.push(interst.interest);        
      }
    }
    console.log(inters);
    this.authservice.saveSettings(this.settings.get('bio').value, inters).subscribe(data => console.log(data))
  }

}
