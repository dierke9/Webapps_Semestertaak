import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from '../category-data.service';
import { Category } from '../category/category.model';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CategoryDataService]
})
export class HeaderComponent implements OnInit {

  private _imgURL: String = "../../assets/logo.jpg";
  private _categories;

  constructor(private categoryDataService: CategoryDataService) { 
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

}
