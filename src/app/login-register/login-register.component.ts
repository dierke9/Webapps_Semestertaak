import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { User } from './user.model';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [UserDataService]
})
export class LoginRegisterComponent implements OnInit {
  private login: FormGroup;
  private register: FormGroup;

  constructor(private fb: FormBuilder, private service: UserDataService) { }

  ngOnInit() {
    this.login = this.fb.group({
      loginusername: this.fb.control('',[Validators.required]),
      loginpassword: this.fb.control('',[Validators.required])
    });
    this.register = this.fb.group({
      username: this.fb.control('',Validators.required),
      email: this.fb.control('',[Validators.required, Validators.email]),
      password: this.fb.control('',[Validators.required, Validators.minLength(6)]),
      repeatPassword: this.fb.control('',[Validators.required]) 
    }, {validator: testEqual()})
  }

  onLogin(){
    console.log(this.login.value);
  }

  onRegister(){
    console.log(this.register.value);
    this.service.register(new User(this.register.get('username').value,this.register.get('email').value,this.register.get('passwoord').value))
  }

}

export function testEqual(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let pwd= control.get('password');
    let repeat = control.get('repeatPassword');
    const equal = pwd.value != repeat.value && pwd.dirty && repeat.dirty ;
    return equal ? {'equal': {value: control.value}} : null;
  };
}
