import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginRegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'register', redirectTo: 'login' },
  { path: 'profile/:username', component: ProfileComponent }
];

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
    LogoutComponent,
    SettingsComponent,
    ProfileComponent
  ]
})
export class UserModule { }
