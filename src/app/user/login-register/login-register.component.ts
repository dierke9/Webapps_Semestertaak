import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  login: FormGroup;
  register: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.login = this.fb.group({
      loginusername: this.fb.control('', [Validators.required]),
      loginpassword: this.fb.control('', [Validators.required])
    });
    this.register = this.fb.group({
      username: ['', [Validators.required], this.checkUniqueUsername()],
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: this.fb.control('', [Validators.required])
    }, { validator: testEqual() });
  }

  onLogin() {
    this.service.login(this.login.value.loginusername, this.login.value.loginpassword)
      .subscribe(val => {
        if (val) {
          if (this.service.redirectURL) {
            this.router.navigateByUrl(this.service.redirectURL);
            this.service.redirectURL = undefined;
          } else {
            this.router.navigate(['home']);
          }
        }
      });
  }

  onRegister() {
    if (this.register.valid) {
      this.service.register(this.register.value.username, this.register.value.password)
        .subscribe(val => { if (val) { console.log(this.register.value); } });
    }
  }

  checkUniqueUsername(): ValidatorFn {
    return (control: AbstractControl):
      Observable<{ [key: string]: any }> => {
      return this.service.checkUniqueUsername(control.value).map(availdable => availdable ? null : { usernameExists: true });
    }
  }

}



function testEqual(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const pwd = control.get('password');
    const repeat = control.get('repeatPassword');
    const equal = pwd.value !== repeat.value && pwd.dirty && repeat.dirty;
    return equal ? { 'equal': { value: control.value } } : null;
  };
}
