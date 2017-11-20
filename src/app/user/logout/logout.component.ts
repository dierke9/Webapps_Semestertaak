import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router, private service : AuthenticationService) { }

  ngOnInit() {
    console.log(this.service.user$);
    this.service.logout();
    this.router.navigate(['home']);
  }

}
