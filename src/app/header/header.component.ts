import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _imgURL: String = "../../assets/logo.jpg";

  constructor() { }

  ngOnInit() {
  }

  get ImgURL():String{
    return this._imgURL;
  }

}
