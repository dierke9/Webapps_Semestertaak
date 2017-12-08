import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../sub-category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../Category.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSubcatComponent } from '../add-subcat/add-subcat.component';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  private _category: Category;

  // tslint:disable-next-line:max-line-length
  constructor(private service: SubCategoryService, private route: ActivatedRoute, private modalSerive: NgbModal, private authService: AuthenticationService) {
    this.route.paramMap.subscribe(pa => this.service.subCategories(pa.get('id')).subscribe(data => this._category = data));
   }

  ngOnInit() {
  }

  get category(){
    return this._category;
  }

  addSubCat() {
    const modal = this.modalSerive.open(AddSubcatComponent);
    modal.componentInstance.newSubcat
    .subscribe(subcat => this.service.addSubcat(subcat, this._category.id)
    .subscribe(returnedSubcat => this._category.SubCats.push(returnedSubcat)));
  }

  get isAdmin(){
    return this.authService.isAdmin;
  }

}
