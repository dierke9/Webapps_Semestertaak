import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../sub-category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  private _category: Category;

  constructor(private service: SubCategoryService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(pa => this.service.subCategories(pa.get('id')).subscribe(data => this._category = data));
   }

  ngOnInit() {
  }

  get category(){
    return this._category;
  }

}
