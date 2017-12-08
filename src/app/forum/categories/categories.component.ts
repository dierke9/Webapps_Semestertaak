import { Component, OnInit } from '@angular/core';
import { CategoryDataService } from '../category-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Category } from '../Category.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private _categories: Category[];

  constructor(private service: CategoryDataService, private modalSerive: NgbModal, private authService: AuthenticationService) {
    this.service.categories.subscribe(data => this._categories = data);
  }

  ngOnInit() {
  }

  get Categories(){
      return this._categories;
  }

  addCategory() {
    console.log('add Category');
    const modal = this.modalSerive.open(AddCategoryComponent);
    modal.componentInstance.newCategory
    .subscribe(category => this.service.saveCategory(category).subscribe(cat => this._categories.push(cat)));
  }

  get isAdmin(){
    return this.authService.isAdmin;
  }

}
