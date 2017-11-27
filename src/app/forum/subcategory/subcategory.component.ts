import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../sub-category.service';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from '../SubCategory.model';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  private _subcat : SubCategory;
  page: number = 1;

  constructor(private service: SubCategoryService, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(pa => this.service.subcatDetail(pa.get('id')).subscribe(data => this._subcat = data));
  }

  ngOnInit() {
  }

  get subCategory(){
    console.log(this._subcat);
    return this._subcat;
  }

  get ThreadCount(){
    return this._subcat.threads.length;
  }

  get startThread(){
    return this.page *10 -10;
  }
  get endThread(){
    var end = this.page*10;
    if(end > this.ThreadCount){
      return end;
    }
    return this.ThreadCount;
  }

}
