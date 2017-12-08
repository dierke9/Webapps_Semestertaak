import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: User;

  constructor(private service: AuthenticationService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => this.service.getUser(param.get('username')).subscribe(user => this._user = user));
  }

  ngOnInit() {
  }

  get user(){
    return this._user;
  }

}
