import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from '../category-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private _categories;

  constructor(private service: CategoryDataService) { 
    this._categories = this.service.categories;
  }

  ngOnInit() {
  }

  get Categories(){
    return this._categories;
  }

}
