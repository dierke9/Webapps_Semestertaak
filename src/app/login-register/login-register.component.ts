import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [AuthenticationService]
})
export class LoginRegisterComponent implements OnInit {
  private login: FormGroup;
  private register: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthenticationService) { }

  ngOnInit() {
    this.login = this.fb.group({
      loginusername: this.fb.control('',[Validators.required]),
      loginpassword: this.fb.control('',[Validators.required])
    });
    this.register = this.fb.group({
      username: ['',[Validators.required],this.checkUniqueUsername()],
      email: this.fb.control('',[Validators.required, Validators.email]),
      password: this.fb.control('',[Validators.required, Validators.minLength(6)]),
      repeatPassword: this.fb.control('',[Validators.required]) 
    }, {validator: testEqual()})
  }

  onLogin(){
    console.log(this.login.value);
  }

  onRegister(){
    this.service.register(this.register.value.username, this.register.value.password).subscribe(val => {if(val){console.log(this.register.value);}})
  }

  checkUniqueUsername() : ValidatorFn {
    return (control : AbstractControl):
      Observable<{[key: string]:any }> => {
        return this.service.checkUniqueUsername(control.value).map(availdable => availdable?null:{usernameExists: true});
      }
  }

}



function testEqual(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let pwd= control.get('password');
    let repeat = control.get('repeatPassword');
    const equal = pwd.value != repeat.value && pwd.dirty && repeat.dirty ;
    return equal ? {'equal': {value: control.value}} : null;
  };
}
