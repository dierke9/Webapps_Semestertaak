import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from '../sub-category.service';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from '../SubCategory.model';
import { AuthenticationService } from '../../user/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddThreadComponent } from '../add-thread/add-thread.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  private _subcat: SubCategory;
  page = 1;

  constructor(private service: SubCategoryService,
      private route: ActivatedRoute,
      private authService: AuthenticationService,
      private modalService: NgbModal) {
    this.route.paramMap.subscribe(pa => this.service.subcatDetail(pa.get('id')).subscribe(data => this._subcat = data));
  }

  ngOnInit() {
  }

  get subCategory() {
    return this._subcat;
  }

  get ThreadCount() {
    return this._subcat.threads.length;
  }

  get startThread() {
    return this.page * 10 - 10;
  }
  get endThread() {
    const end = this.page * 10;
    if (end > this.ThreadCount) {
      return end;
    }
    return this.ThreadCount;
  }

  newThread() {
    console.log('New Thread');
    const modal = this.modalService.open(AddThreadComponent);
    modal.componentInstance.newThread
    .subscribe(object => this.service.addThread(object.title, object.post, this._subcat.id, this.authService.user$.getValue())
    .subscribe(thread => this._subcat.threads.unshift(thread)));
  }
}
