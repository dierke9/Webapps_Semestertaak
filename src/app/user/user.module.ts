import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import {LogoutComponent} from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AuthenticationService} from './authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes : Routes = [
  {path: 'login', component: LoginRegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', redirectTo: 'login'}
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [
      LoginRegisterComponent,
      LogoutComponent
  ],
  providers:[AuthenticationService]

})
export class UserModule { }
