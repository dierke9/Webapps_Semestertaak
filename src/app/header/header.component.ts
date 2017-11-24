import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from '../forum/category-data.service';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../user/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CategoryDataService, AuthenticationService]
})
export class HeaderComponent implements OnInit {

  private _imgURL: String = "../../assets/logo.jpg";
  private _categories;

  constructor(private categoryDataService: CategoryDataService, private auth: AuthenticationService) { 
    this._categories = categoryDataService.categories;
  }

  ngOnInit() {
  }

  get ImgURL():String{
    return this._imgURL;
  }

  get Categories(){
    return this._categories;
  }

  get currentuser(){
    return this.auth.user$;
  }

  logout(){
    this.auth.logout();
  }

}
