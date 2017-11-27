import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryDataService } from './category-data.service';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubCategoryService } from './sub-category.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: "forum", component: CategoriesComponent },
  { path: "category/:id", component: CategoryDetailComponent },
  { path: "thread/:id", component: SubcategoryComponent }
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    SubcategoryComponent
  ],
  providers: [
    CategoryDataService,
    SubCategoryService
  ]
})
export class ForumModule { }
